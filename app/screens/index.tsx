import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDictionnaire } from '../contexts/DictionnaireContext';
import { globalStyles } from "../styles";
import { Vedette as VedetteType } from '../../src/types/mots';

// Interface Vedette étendue pour inclure les propriétés supplémentaires
interface Vedette extends VedetteType {
  'registre-vedette'?: string;
  'domaine-vedette'?: string;
  [key: string]: any; // Pour les propriétés dynamiques
}

// Interface pour les blocs grammaticaux
interface BlocGram {
  'cat-gram'?: string;
  'registre-bloc-gram'?: string;
  'domaine-bloc-gram'?: string;
  'blocs-semantiques'?: any[];
  [key: string]: any; // Pour les propriétés dynamiques
}

// Interface Article complète
interface ArticleV2 {
  id: string;
  vedette: Vedette;
  'bloc-gram'?: BlocGram;
  [key: string]: any; // Pour les propriétés dynamiques supplémentaires
}

const ITEMS_PER_LOAD = 100; // Nombre d'éléments à charger à chaque fois

function ListeMots() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayedArticles, setDisplayedArticles] = useState<ArticleV2[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const styles = globalStyles(false);
  const { articles, isReady } = useDictionnaire();

  // Tri et filtrage des articles (mémoïsé)
  const sortedArticles = useMemo(() => {
    if (!isReady) return [];
    return articles
      .filter(a => a.vedette?.mot)
      .sort((a, b) => a.vedette.mot.localeCompare(b.vedette.mot, 'et'));
  }, [articles, isReady]);

  // Chargement initial des données
  useEffect(() => {
    if (isReady && sortedArticles.length > 0) {
      setIsLoading(true);
      // Utiliser requestIdleCallback ou setTimeout pour ne pas bloquer le thread principal
      setTimeout(() => {
        setDisplayedArticles(sortedArticles.slice(0, ITEMS_PER_LOAD));
        setCurrentIndex(ITEMS_PER_LOAD);
        setIsLoading(false);
      }, 0);
    }
  }, [isReady, sortedArticles]);

  // Fonction pour charger plus d'éléments
  const loadMoreItems = useCallback(() => {
    if (isLoadingMore || searchText) return; // Ne pas charger plus si on recherche
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextItems = sortedArticles.slice(currentIndex, currentIndex + ITEMS_PER_LOAD);
      if (nextItems.length > 0) {
        setDisplayedArticles(prev => [...prev, ...nextItems]);
        setCurrentIndex(prev => prev + ITEMS_PER_LOAD);
      }
      setIsLoadingMore(false);
    }, 100);
  }, [sortedArticles, currentIndex, isLoadingMore, searchText]);

  // Recherche optimisée avec mémoïsation
  const filteredArticles = useMemo(() => {
    if (!searchText) return displayedArticles;
    const searchLower = searchText.toLowerCase();
    return sortedArticles.filter((article: ArticleV2) =>
      article.vedette.mot.toLowerCase().startsWith(searchLower)
    );
  }, [sortedArticles, displayedArticles, searchText]);

  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
    if (!text && sortedArticles.length > 0) {
      setDisplayedArticles(sortedArticles.slice(0, ITEMS_PER_LOAD));
      setCurrentIndex(ITEMS_PER_LOAD);
    }
  }, [sortedArticles]);

  const handlePress = useCallback((article: ArticleV2) => {
    router.push({ pathname: "/screens/DetailMot", params: { articleId: article.id } });
  }, [router]);

  const handleReset = useCallback(() => {
    setSearchText("");
    if (sortedArticles.length > 0) {
      setDisplayedArticles(sortedArticles.slice(0, ITEMS_PER_LOAD));
      setCurrentIndex(ITEMS_PER_LOAD);
    }
  }, [sortedArticles]);

  // Fonction pour récupérer les équivalents (hors composant pour optimisation)
  const getEquivalents = (article: ArticleV2): string[] => {
    const out: string[] = [];
    const seen = new Set<string>();
    const blocs = article['bloc-gram']?.['blocs-semantiques'] || [];
    blocs.forEach((bloc: any) => {
      const sous = bloc['sous-blocs-semantiques'] || [];
      sous.forEach((sb: any) => {
        const ctxs = sb['blocs-contextuels'] || [];
        ctxs.forEach((ctx: any) => {
          const eqs = ctx['blocs-equivalents'] || [];
          eqs.forEach((eq: any) => {
            const motFr = eq['article-francais']?.vedette?.mot;
            if (motFr) {
              // Équivalent avec mot-princ
              const equivalent = (eq.avant ? `${eq.avant} ` : '') + motFr + (eq.apres ? ` ${eq.apres}` : '');
              const key = (eq.avant || '') + motFr + (eq.apres || '');
              if (!seen.has(key)) {
                seen.add(key);
                out.push(equivalent);
              }
            } else if (eq.avant || eq.apres) {
              // Équivalent sans mot-princ mais avec avant ou apres
              const equivalent = (eq.avant || '') + (eq.apres ? ` ${eq.apres}` : '');
              const key = equivalent;
              if (equivalent && !seen.has(key)) {
                seen.add(key);
                out.push(equivalent);
              }
            }
          });
        });
      });
    });
    return out;
  };

  // Composant mémoïsé pour les items de la liste
  const ListeItem = React.memo(({ item, onPress, itemStyle }: { 
    item: ArticleV2; 
    onPress: (article: ArticleV2) => void;
    itemStyle: any;
  }) => {
    const displayText = item.vedette.particule 
      ? `${item.vedette.particule} ${item.vedette.mot}` 
      : item.vedette.mot;
    const catGram = item['bloc-gram']?.['cat-gram'];
    const equivalentsList = getEquivalents(item);

    return (
      <TouchableOpacity 
        style={itemStyle} 
        onPress={() => onPress(item)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Colonne gauche: mot, cat-gram, équivalents */}
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1, paddingRight: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
              <Text style={{ fontSize: 16 }}>{displayText}</Text>
              {catGram && (
                <Text style={{ fontSize: 12, color: '#666', fontStyle: 'italic', marginLeft: 8 }}>
                  ({catGram})
                </Text>
              )}
            </View>
            {equivalentsList.length > 0 && (
              <Text style={{ marginTop: 2, fontSize: 13, color: '#007AFF' }}>
                {equivalentsList.join(', ')}
              </Text>
            )}
          </View>

          {/* Colonne droite: + d'infos */}
          <TouchableOpacity onPress={() => onPress(item)} accessibilityRole="button" hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={{ fontSize: 13, color: '000', fontWeight: 'bold' }}>+ d'infos</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  });

  const renderItem = useCallback(({ item }: { item: ArticleV2 }) => (
    <ListeItem item={item} onPress={handlePress} itemStyle={styles.itemText} />
  ), [handlePress, styles.itemText]);

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: 50, offset: 50 * index, index,
  }), []);

  const renderFooter = useCallback(() => {
    if (!isLoadingMore || searchText) return null;
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={{ marginTop: 8, color: '#8E8E93' }}>Chargement de plus de mots...</Text>
      </View>
    );
  }, [isLoadingMore, searchText]);

  if (isLoading || !isReady) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, fontSize: 16, color: '#8E8E93' }}>Chargement du dictionnaire...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            {Platform.OS === 'web' ? (
              <Text style={{ marginRight: 8, color: "#8E8E93", fontSize: 16 }}>🔍</Text>
            ) : (
              <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
            )}
            <TextInput 
              style={styles.searchInput}
              placeholder="Rechercher un mot..."
              onChangeText={handleSearch}
              value={searchText}
              placeholderTextColor="#8E8E93"
              clearButtonMode="while-editing"
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={handleReset} style={styles.clearButton}>
                {Platform.OS === 'web' ? (
                  <Text style={{ color: "#8E8E93", fontSize: 16 }}>✕</Text>
                ) : (
                  <Ionicons name="close-circle" size={20} color="#8E8E93" />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
        <FlatList
          data={filteredArticles}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.listContent}
          removeClippedSubviews={true}
          maxToRenderPerBatch={500}
          updateCellsBatchingPeriod={100}
          initialNumToRender={15}
          windowSize={10}
          getItemLayout={getItemLayout}
          scrollEventThrottle={16}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
        <View style={styles.footerContainer}>
          <Text>© Association franco-estonienne de lexicographie et Institut de la langue estonienne.</Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

// Mémoïser le composant pour éviter les re-rendus inutiles
export default React.memo(ListeMots);
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDictionnaire } from "../contexts/DictionnaireContext";
import { globalStyles } from "../styles";
import { Article } from "../_types/dictionary";
import { formatCatGramsDisplay, getBlocsGram } from "../_utils/blocsGram";

const ITEMS_PER_LOAD = 100; // Nombre d'éléments à charger à chaque fois

function ListeMots() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const styles = globalStyles(false);
  const { articles, isReady } = useDictionnaire();

  // Tri et filtrage des articles (mémoïsé)
  const sortedArticles = useMemo(() => {
    if (!isReady) return [];
    return articles
      .filter((a) => a.vedette?.mot)
      .sort((a, b) => a.vedette.mot.localeCompare(b.vedette.mot, "et"));
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
      const nextItems = sortedArticles.slice(
        currentIndex,
        currentIndex + ITEMS_PER_LOAD,
      );
      if (nextItems.length > 0) {
        setDisplayedArticles((prev) => [...prev, ...nextItems]);
        setCurrentIndex((prev) => prev + ITEMS_PER_LOAD);
      }
      setIsLoadingMore(false);
    }, 100);
  }, [sortedArticles, currentIndex, isLoadingMore, searchText]);

  // Recherche optimisée avec mémoïsation
  const filteredArticles = useMemo(() => {
    if (!searchText) return displayedArticles;
    const searchLower = searchText.toLowerCase();
    return sortedArticles.filter((article: Article) =>
      article.vedette.mot.toLowerCase().startsWith(searchLower),
    );
  }, [sortedArticles, displayedArticles, searchText]);

  const handleSearch = useCallback(
    (text: string) => {
      setSearchText(text);
      if (!text && sortedArticles.length > 0) {
        setDisplayedArticles(sortedArticles.slice(0, ITEMS_PER_LOAD));
        setCurrentIndex(ITEMS_PER_LOAD);
      }
    },
    [sortedArticles],
  );

  const handlePress = useCallback(
    (article: Article) => {
      router.push({
        pathname: "/screens/DetailMot",
        params: { articleId: article.id },
      });
    },
    [router],
  );

  const handleReset = useCallback(() => {
    setSearchText("");
    if (sortedArticles.length > 0) {
      setDisplayedArticles(sortedArticles.slice(0, ITEMS_PER_LOAD));
      setCurrentIndex(ITEMS_PER_LOAD);
    }
  }, [sortedArticles]);

  // Fonction pour récupérer les équivalents par contexte (hors composant pour optimisation)
  const getEquivalentsWithContext = (
    article: Article,
  ): { indication: string; equivalents: string[] }[] => {
    const contexts: { indication: string; equivalents: string[] }[] = [];
    getBlocsGram(article).forEach((blocGram) => {
      const blocs = blocGram["blocs-semantiques"] || [];
      blocs.forEach((bloc: any) => {
        bloc["sous-blocs-semantiques"]?.forEach((sb: any) => {
          sb["blocs-contextuels"]?.forEach((ctx: any) => {
            const indication = ctx["indication-contextuel"] || "";
            const contexteEquivalents: string[] = [];

            ctx["blocs-equivalents"]?.forEach((eq: any) => {
              const motFr = eq["article-francais"]?.vedette?.mot;

              if (motFr) {
                const equivalent =
                  (eq.avant ? `${eq.avant} ` : "") +
                  motFr +
                  (eq.apres ? ` ${eq.apres}` : "");
                contexteEquivalents.push(equivalent);
              } else if (eq.avant || eq.apres) {
                const equivalent =
                  (eq.avant || "") + (eq.apres ? ` ${eq.apres}` : "");
                if (equivalent) contexteEquivalents.push(equivalent);
              }
            });

            if (contexteEquivalents.length > 0) {
              contexts.push({ indication, equivalents: contexteEquivalents });
            }
          });
        });
      });
    });

    return contexts;
  };

  // Composant mémoïsé pour les items de la liste
  const ListeItem = React.memo(
    ({
      item,
      onPress,
      itemStyle,
    }: {
      item: Article;
      onPress: (article: Article) => void;
      itemStyle: any;
    }) => {
      const displayText = item.vedette.particule
        ? `${item.vedette.particule} ${item.vedette.mot}`
        : item.vedette.mot;
      const catGram = formatCatGramsDisplay(item);
      const equivalentsWithContext = getEquivalentsWithContext(item);

      return (
        <TouchableOpacity style={itemStyle} onPress={() => onPress(item)}>
          <View style={styles.itemContainer}>
            {/* Colonne gauche: mot, cat-gram, équivalents */}
            <View style={styles.itemLeftColumn}>
              <View style={styles.itemHeaderRow}>
                <Text style={styles.itemMotText}>{displayText}</Text>
                {catGram && <Text style={styles.itemCatGram}>({catGram})</Text>}
              </View>
              {equivalentsWithContext.length > 0 && (
                <Text style={styles.itemEquivalents}>
                  {equivalentsWithContext
                    .map((context) => {
                      const equivs = context.equivalents.join(", ");
                      return context.indication
                        ? `[${context.indication}] ${equivs}`
                        : equivs;
                    })
                    .join(" · ")}
                </Text>
              )}
            </View>

            {/* Colonne droite: + d'infos */}
            <TouchableOpacity
              onPress={() => onPress(item)}
              accessibilityRole="button"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.itemInfoButton}>+ d'infos</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    },
  );
  ListeItem.displayName = "ListeItem";

  const renderItem = useCallback(
    ({ item }: { item: Article }) => (
      <ListeItem
        item={item}
        onPress={handlePress}
        itemStyle={styles.itemText}
      />
    ),
    [handlePress, styles.itemText],
  );

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: 50,
      offset: 50 * index,
      index,
    }),
    [],
  );

  const renderFooter = useCallback(() => {
    if (!isLoadingMore || searchText) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.loadingText}>Chargement de plus de mots...</Text>
      </View>
    );
  }, [isLoadingMore, searchText, styles]);

  if (isLoading || !isReady) {
    return (
      <SafeAreaView style={styles.loadingFullScreen}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingFullScreenText}>
          Chargement du dictionnaire...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            {Platform.OS === "web" ? (
              <Text style={styles.searchIconWeb}>🔍</Text>
            ) : (
              <Ionicons
                name="search"
                size={20}
                color="#8E8E93"
                style={styles.searchIcon}
              />
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
              <TouchableOpacity
                onPress={handleReset}
                style={styles.clearButton}
              >
                {Platform.OS === "web" ? (
                  <Text style={styles.clearIconWeb}>✕</Text>
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
          keyExtractor={(item) => item.id}
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
          <Text>
            © Association franco-estonienne de lexicographie et Institut de la
            langue estonienne.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Mémoïser le composant pour éviter les re-rendus inutiles
export default React.memo(ListeMots);

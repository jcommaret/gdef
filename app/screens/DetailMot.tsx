import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";

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
interface Article {
  id: string;
  vedette: Vedette;
  'bloc-gram'?: BlocGram;
  [key: string]: any; // Pour les propriétés dynamiques supplémentaires
}

function DetailMot() {
  const params = useLocalSearchParams();
  const articleId = params.articleId as string;
  const style = globalStyles(false);
  const router = useRouter();
  const { articlesById, articlesByMot } = useDictionnaire();
  
  // Recherche O(1) au lieu de O(n) avec les index Map
  const fullArticle = useMemo(() => {
    // D'abord essayer de trouver par ID exact (plus précis)
    let article = articlesById.get(articleId);
    
    // Si pas trouvé par ID, essayer par mot (pour compatibilité)
    if (!article) {
      article = articlesByMot.get(articleId);
    }
    
    return article;
  }, [articleId, articlesById, articlesByMot]);
  
  if (!fullArticle) {
    return (
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={style.vedetteContainer}>
          <Text style={style.text}>❌ Article non trouvé pour: {articleId}</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[style.text, { color: '#007AFF', marginTop: 20 }]}>
              ← Retour à la liste
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Les références sont déjà résolues dans le nouveau format
  // Plus besoin de fonction resolveMot

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* BOUTON RETOUR POUR WEB */}
      {Platform.OS === 'web' && (
        <TouchableOpacity 
          onPress={() => router.back()}
          style={style.backButton}
        >
          <Text style={style.backButtonText}>← Retour</Text>
        </TouchableOpacity>
      )}
      
      {/* VEDETTE */}
      <View style={style.vedetteContainer}>
        <Text style={style.text}>
          {fullArticle.vedette.particule && (
            <Text style={style.vedetteParticule}>{fullArticle.vedette.particule} </Text>
          )}
          {fullArticle.vedette.mot}
          {fullArticle.vedette.hm && (
            <Text style={style.vedetteCatGram}> {fullArticle.vedette.hm}</Text>
          )}
          {fullArticle['bloc-gram']?.['cat-gram'] && (
            <Text style={style.vedetteCatGram}>
              {' '}({fullArticle['bloc-gram']['cat-gram']})
            </Text>
          )}
        </Text>
        
        {/* Variante */}
        {fullArticle.vedette.variante && fullArticle.vedette.variante !== "" && (
          <Text style={[style.text, { fontStyle: 'italic' }]}>
            Variante: {fullArticle.vedette.variante}
          </Text>
        )}
        
        {/* Type */}
        {fullArticle.vedette.type && 
         fullArticle.vedette.type !== "lsnonflechi" && 
         fullArticle.vedette.type !== "lcompose" && (
          <Text style={[style.text, style.vedetteType]}>
            Type: {fullArticle.vedette.type}
          </Text>
        )}
        
       
        
        {/* Morphologie - bloc-morph */}
        {fullArticle.vedette['bloc-morph'] && (
          <View style={{ marginTop: 8 }}>
            {fullArticle.vedette['bloc-morph'].formes && (
              <Text style={style.text}>
                {(() => {
                  const formes = fullArticle.vedette['bloc-morph'].formes;
                  // Traitement spécial pour les mots composés (type "lcompose")
                  if (fullArticle.vedette.type === "lcompose" && formes.startsWith("+")) {
                    // Extraire la première partie du mot composé (avant la dernière partie)
                    const mot = fullArticle.vedette.mot;
                    const dernierePartie = formes.substring(1).split(' ')[0].replace(/'/g, '');
                    const prefixe = mot.replace(new RegExp(dernierePartie + '$'), '');
                    // Remplacer le "+" par le préfixe et ajouter le préfixe à toutes les formes
                    return formes.substring(1).split(' ').map((forme: string) => 
                      forme ? prefixe + forme.replace(/'/g, '') : ''
                    ).join(' ');
                  }
                  return formes;
                })()}
              </Text>
            )}
          </View>
        )}
        
        {/* Registre et domaine vedette */}
        {fullArticle.vedette['registre-vedette'] && (
          <Text style={[style.text, { fontSize: 12, color: '#666', fontStyle: 'italic' }]}>
            Registre: {fullArticle.vedette['registre-vedette']}
          </Text>
        )}
        {fullArticle.vedette['domaine-vedette'] && (
          <Text style={[style.text, { fontSize: 12, color: '#666', fontStyle: 'italic' }]}>
            Domaine: {fullArticle.vedette['domaine-vedette']}
          </Text>
        )}

      </View>
      
      {/* BLOC GRAMMATICAL ET BLOCS SÉMANTIQUES */}
      {fullArticle['bloc-gram'] && (
        <View style={[style.blocGramContainer, { padding: 16 }]}>
          
          {/* Informations du bloc grammatical */}
          {fullArticle['bloc-gram']['registre-bloc-gram'] && (
            <Text style={[style.text, { fontSize: 12, color: '#666', fontStyle: 'italic', marginBottom: 4 }]}>
              Registre: {fullArticle['bloc-gram']['registre-bloc-gram']}
            </Text>
          )}
          {fullArticle['bloc-gram']['domaine-bloc-gram'] && (
            <Text style={[style.text, { fontSize: 12, color: '#666', fontStyle: 'italic', marginBottom: 8 }]}>
              Domaine: {fullArticle['bloc-gram']['domaine-bloc-gram']}
            </Text>
          )}
          
          {/* ÉQUIVALENTS FRANÇAIS GÉNÉRAUX */}
          {fullArticle['bloc-gram']['blocs-semantiques'] && (() => {
            // Collecter tous les équivalents français des blocs sémantiques avec "avant" et "apres"
            const equivalents: string[] = [];
            const seen = new Set<string>();
            
            fullArticle['bloc-gram']['blocs-semantiques'].forEach((bloc: any) => {
              bloc['sous-blocs-semantiques']?.forEach((sousBloc: any) => {
                sousBloc['blocs-contextuels']?.forEach((blocContextuel: any) => {
                  blocContextuel['blocs-equivalents']?.forEach((equiv: any) => {
                    const motFrancais = equiv['article-francais']?.vedette?.mot;
                    if (motFrancais) {
                      // Équivalent avec mot-princ
                      const equivalent = (equiv.avant ? `${equiv.avant} ` : '') + motFrancais + (equiv.apres ? ` ${equiv.apres}` : '');
                      const key = (equiv.avant || '') + motFrancais + (equiv.apres || '');
                      if (!seen.has(key)) {
                        seen.add(key);
                        equivalents.push(equivalent);
                      }
                    } else if (equiv.avant || equiv.apres) {
                      // Équivalent sans mot-princ mais avec avant ou apres
                      const equivalent = (equiv.avant || '') + (equiv.apres ? ` ${equiv.apres}` : '');
                      const key = equivalent;
                      if (equivalent && !seen.has(key)) {
                        seen.add(key);
                        equivalents.push(equivalent);
                      }
                    }
                  });
                });
              });
            });
            
            return equivalents.length > 0 && (
              <View style={style.equivalentsSection}>
                <Text style={style.text}>
                  {equivalents.join(', ')}
                </Text>
              </View>
            );
          })()}

          {/* BLOCS SÉMANTIQUES AVEC SOUS-SENS */}
          {fullArticle['bloc-gram']['blocs-semantiques'] && fullArticle['bloc-gram']['blocs-semantiques'].map((bloc: any, index: number) => (
            <View key={index} style={style.blocSemantiqueContainer}>
              {/* Indication sémantique principale */}
              <Text style={[style.text, style.blocSemIndication, { fontWeight: '600', marginBottom: 8 }]}>
                {/* Domaine du bloc sémantique */}
                {bloc['domaine-bloc-semantique'] && (
                  <Text style={[style.text, style.blocSemDomaine]}>
                    {' '}({bloc['domaine-bloc-semantique']})
                  </Text>
                )}
              </Text>
              
              {/* Registre du sens vedette */}
              {bloc['registre-sens-ved'] && (
                <Text style={[style.text, { fontSize: 12, color: '#666', fontStyle: 'italic', marginBottom: 4 }]}>
                  Registre: {bloc['registre-sens-ved']}
                </Text>
              )}
              
              {/* Sous-blocs sémantiques avec contextes et équivalents */}
              {bloc['sous-blocs-semantiques'] && bloc['sous-blocs-semantiques'].map((sousBloc: any, sousIndex: number) => (
                <View key={sousIndex} style={{ marginLeft: 16, marginBottom: 8 }}>
                  {/* Indication sémantique niveau 2 */}
                  {sousBloc['indication-semantique-2'] && (
                    <Text style={[style.text, { fontStyle: 'italic', marginBottom: 4, fontWeight: '500' }]}>
                      {sousBloc['indication-semantique-2']}
                    </Text>
                  )}
                  
                  {/* Blocs contextuels avec indications et équivalents */}
                  {sousBloc['blocs-contextuels'] && sousBloc['blocs-contextuels'].map((blocContextuel: any, contextIndex: number) => (
                    <View key={contextIndex} style={{ marginLeft: 16, marginBottom: 6, borderLeftWidth: 2, borderLeftColor: '#E0E0E0', paddingLeft: 8 }}>
                      {/* Indication contextuelle */}
                      {blocContextuel['indication-contextuel'] && (
                        <Text style={[style.text, { fontStyle: 'italic', fontSize: 14, color: '#666', marginBottom: 3 }]}>
                          • {blocContextuel['indication-contextuel']}
                        </Text>
                      )}
                      
                      {/* Équivalents français du bloc contextuel */}
                      {blocContextuel['blocs-equivalents'] && blocContextuel['blocs-equivalents'].length > 0 && (
                        <Text style={[style.text, { color: '#007AFF', fontSize: 16, paddingLeft: 8}]}>
                          {blocContextuel['blocs-equivalents'].map((equiv: any) => {
                            const parts = [];
                            if (equiv.avant) parts.push(equiv.avant);
                            if (equiv['article-francais']?.vedette?.mot) {
                              parts.push(equiv['article-francais'].vedette.mot);
                            }
                            if (equiv.apres) parts.push(equiv.apres);
                            
                            // Afficher les informations de rection si disponibles
                            if (equiv['rection-equiv']) {
                              if (equiv['rection-equiv']['rection-equiv-est']) {
                                parts.push(`[est: ${equiv['rection-equiv']['rection-equiv-est']}]`);
                              }
                              if (equiv['rection-equiv']['rection-equiv-fra']) {
                                parts.push(`[fra: ${equiv['rection-equiv']['rection-equiv-fra']}]`);
                              }
                            }
                            
                            // Afficher l'explication si disponible
                            if (equiv.explication) {
                              parts.push(`(${equiv.explication})`);
                            }
                            
                            // Afficher le registre si disponible
                            if (equiv['registre-equiv']) {
                              parts.push(`[${equiv['registre-equiv']}]`);
                            }
                            
                            return parts.filter(Boolean).join(' ');
                          }).join(', ')}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              ))}
              
              {/* Exemples du bloc */}
              {bloc.exemples && bloc.exemples.length > 0 && bloc.exemples.map((exemple: any, exempleIndex: number) => (
                <View key={exempleIndex} style={style.exempleItem}>
                  {/* Exemple estonien */}
                  {exemple['exemple-est'] && (
                    <Text style={[style.text, style.exempleEstonien]}>
                      {exemple['proverbe-exemple-est'] === 'true' && '◊ '}
                      {exemple['exemple-est']}
                    </Text>
                  )}
                  
                  {/* Registre et domaine de l'exemple */}
                  {(exemple['registre-exe-est'] || exemple['domaine-exe-est']) && (
                    <Text style={[style.text, { fontSize: 12, color: '#666', fontStyle: 'italic' }]}>
                      {[exemple['registre-exe-est'], exemple['domaine-exe-est']].filter(Boolean).join(', ')}
                    </Text>
                  )}
                  
                  {/* Traduction française */}
                  {exemple['bloc-traduction-exe'] && (
                    <View>
                      {exemple['bloc-traduction-exe']['indic-sem-exe'] && (
                        <Text style={[style.text, { fontSize: 12, color: '#666', fontStyle: 'italic' }]}>
                          {exemple['bloc-traduction-exe']['indic-sem-exe']}
                        </Text>
                      )}
                      {exemple['bloc-traduction-exe']['traduction-exe'] && (
                        <Text style={[style.text, style.exempleFrancais]}>
                          {exemple['bloc-traduction-exe']['proverbe-traduction-exe'] === 'true' && '◊ '}
                          {exemple['bloc-traduction-exe']['traduction-exe']}
                        </Text>
                      )}
                      {exemple['bloc-traduction-exe']['registre-trad-exe'] && (
                        <Text style={[style.text, { fontSize: 12, color: '#666', fontStyle: 'italic' }]}>
                          Registre: {exemple['bloc-traduction-exe']['registre-trad-exe']}
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))}


        </View>
      )}

      {/* EXPRESSIONS PHRASÉOLOGIQUES */}
      {(() => {
        // Vérifier s'il y a des expressions avec du contenu réel
        const expressionsValides = fullArticle['blocs-phraseologiques']?.filter((expr: any) => 
          expr['expression-est'] || 
          (expr['blocs-traduction-expr'] && expr['blocs-traduction-expr'].length > 0 && 
           expr['blocs-traduction-expr'].some((trad: any) => trad['traduction-expr']))
        ) || [];

        return expressionsValides.length > 0 && (
          <View style={style.expressionsContainer}>
            <Text style={[style.text, style.blocSemIndication]}>Expressions phraséologiques</Text>
            {expressionsValides.map((expr: any, index: number) => (
              <View key={index} style={style.expressionItem}>
                {/* Expression estonienne */}
                {expr['expression-est'] && (
                  <Text style={[style.text, style.expressionEstonienne]}>
                    {expr['expression-est']}
                  </Text>
                )}
                
                {/* Registre de l'expression */}
                {expr['registre-expression-est'] && (
                  <Text style={[style.text, { fontSize: 12, color: '#666', fontStyle: 'italic' }]}>
                    Registre: {expr['registre-expression-est']}
                  </Text>
                )}
                
                {/* Traductions */}
                {expr['blocs-traduction-expr'] && expr['blocs-traduction-expr'].length > 0 && (
                  <View style={{ marginLeft: 8 }}>
                    {expr['blocs-traduction-expr'].map((trad: any, tradIndex: number) => (
                      <View key={tradIndex} style={{ marginBottom: 4 }}>
                        {/* Indication sémantique de l'expression */}
                        {trad['indic-sem-expr'] && (
                          <Text style={[style.text, { fontSize: 12, color: '#666', fontStyle: 'italic' }]}>
                            {trad['indic-sem-expr']}
                          </Text>
                        )}
                        
                        {/* Locution traduction */}
                        {trad['locution-traduction-expression'] && (
                          <Text style={[style.text, { fontSize: 12, color: '#666', fontStyle: 'italic' }]}>
                            Locution: {trad['locution-traduction-expression']}
                          </Text>
                        )}
                        
                        {/* Traduction française */}
                        {trad['traduction-expr'] && (
                          <Text style={[style.text, style.expressionFrancaise]}>
                            {trad['traduction-expr']}
                          </Text>
                        )}
                        
                        {/* Registre de la traduction */}
                        {trad['registre-trad-expr'] && (
                          <Text style={[style.text, { fontSize: 12, color: '#666', fontStyle: 'italic' }]}>
                            Registre trad.: {trad['registre-trad-expr']}
                          </Text>
                        )}
                        
                        {/* Rection de traduction */}
                        {trad['rection-trad'] && (
                          <Text style={[style.text, { fontSize: 12, color: '#666', fontStyle: 'italic' }]}>
                            Rection: {[
                              trad['rection-trad']['rection-trad-est'] && `est: ${trad['rection-trad']['rection-trad-est']}`,
                              trad['rection-trad']['rection-trad-fra'] && `fra: ${trad['rection-trad']['rection-trad-fra']}`
                            ].filter(Boolean).join(', ')}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}
                
                {/* Renvois phraséologiques */}
                {expr['blocs-renvois'] && expr['blocs-renvois'].length > 0 && (
                  <View style={{ marginLeft: 8 }}>
                    <Text style={[style.text, { fontSize: 12, color: '#666', fontStyle: 'italic' }]}>
                      Renvois: {expr['blocs-renvois'].map((renvoi: any) => renvoi['renvoi-phraseol']).filter(Boolean).join(', ')}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        );
      })()}
    </ScrollView>
  );
}

// Mémoïser le composant pour éviter les re-rendus inutiles
export default React.memo(DetailMot);
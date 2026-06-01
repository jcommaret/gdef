import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { LigneEquivalents } from "../_components/LigneEquivalents";
import { useDictionnaire } from "../contexts/DictionnaireContext";
import { globalStyles } from "../styles";
import {
  formatBlocGramLabel,
  formatBlocSemantiqueNumero,
  formatCatGramsDisplay,
  getBlocsGram,
} from "../_utils/blocsGram";

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

  const blocsGram = useMemo(
    () => (fullArticle ? getBlocsGram(fullArticle) : []),
    [fullArticle],
  );
  const catGramDisplay = useMemo(
    () => (fullArticle ? formatCatGramsDisplay(fullArticle) : undefined),
    [fullArticle],
  );
  const hasMultipleBlocsGram = blocsGram.length > 1;

  if (!fullArticle) {
    return (
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={style.vedetteContainer}>
          <Text style={style.text}>
            ❌ Article non trouvé pour: {articleId}
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[style.text, { color: "#007AFF", marginTop: 20 }]}>
              ← Retour
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* VEDETTE */}
      <View style={style.vedetteContainer}>
        <Text>
          {fullArticle.vedette.particule && (
            <Text style={style.itemMotText}>
              {fullArticle.vedette.particule}{" "}
            </Text>
          )}
          <Text style={style.itemMotText}>{fullArticle.vedette.mot}</Text>
          {fullArticle.vedette.hm && (
            <Text style={style.vedetteHm}> {fullArticle.vedette.hm}</Text>
          )}
          {catGramDisplay && (
            <Text style={style.vedetteCatGram}> ({catGramDisplay})</Text>
          )}
        </Text>

        {/* Variante */}
        {fullArticle.vedette.variante &&
          fullArticle.vedette.variante !== "" && (
            <Text style={[style.text, { fontStyle: "italic" }]}>
              Variante: {fullArticle.vedette.variante}
            </Text>
          )}

        {/* Type */}
        {fullArticle.vedette.type &&
          fullArticle.vedette.type !== "lsnonflechi" &&
          fullArticle.vedette.type !== "lcompose" &&
          fullArticle.vedette.type !== "vap" && (
            <Text style={[style.text, style.vedetteType]}>
              Type: {fullArticle.vedette.type}
            </Text>
          )}

        {/* Morphologie - bloc-morph */}
        {fullArticle.vedette["bloc-morph"] && (
          <View style={style.blocMorphContainer}>
            {fullArticle.vedette["bloc-morph"].formes && (
              <Text style={style.text}>
                {(() => {
                  const formes = fullArticle.vedette["bloc-morph"].formes;
                  // Traitement spécial pour les mots composés (type "lcompose")
                  if (
                    fullArticle.vedette.type === "lcompose" &&
                    formes.startsWith("+")
                  ) {
                    // Extraire la première partie du mot composé (avant la dernière partie)
                    const mot = fullArticle.vedette.mot;
                    const dernierePartie = formes
                      .substring(1)
                      .split(" ")[0]
                      .replace(/'/g, "");
                    const prefixe = mot.replace(
                      new RegExp(dernierePartie + "$"),
                      "",
                    );
                    // Remplacer le "+" par le préfixe et ajouter le préfixe à toutes les formes
                    return formes
                      .substring(1)
                      .split(" ")
                      .map((forme: string) =>
                        forme ? prefixe + forme.replace(/'/g, "") : "",
                      )
                      .join(" ");
                  }
                  return formes;
                })()}
              </Text>
            )}
          </View>
        )}

        {/* Registre et domaine vedette */}
        {fullArticle.vedette["registre-vedette"] && (
          <Text
            style={[
              style.text,
              { fontSize: 12, color: "#666", fontStyle: "italic" },
            ]}
          >
            Registre: {fullArticle.vedette["registre-vedette"]}
          </Text>
        )}
        {fullArticle.vedette["domaine-vedette"] && (
          <Text
            style={[
              style.text,
              { fontSize: 12, color: "#666", fontStyle: "italic" },
            ]}
          >
            Domaine: {fullArticle.vedette["domaine-vedette"]}
          </Text>
        )}
      </View>

      {/* BLOC(S) GRAMMATICAL(AUX) ET BLOCS SÉMANTIQUES */}
      {blocsGram.map((blocGram, bgIndex) => (
        <View
          key={bgIndex}
          style={[style.blocGramContainer, { padding: 16 }]}
        >
          {hasMultipleBlocsGram && blocGram["cat-gram"] && (
            <Text style={[style.text, style.blocGramLabel]}>
              {formatBlocGramLabel(bgIndex, blocGram["cat-gram"])}
            </Text>
          )}

          {blocGram["registre-bloc-gram"] && (
            <Text style={[style.text, style.registreBlocGram]}>
              Registre: {blocGram["registre-bloc-gram"]}
            </Text>
          )}
          {blocGram["domaine-bloc-gram"] && (
            <Text style={[style.text, style.domaineBlocGram]}>
              Domaine: {blocGram["domaine-bloc-gram"]}
            </Text>
          )}

          {blocGram["blocs-semantiques"] &&
            (() => {
              const blocsSem = blocGram["blocs-semantiques"];
              const hasMultipleBlocsSem = blocsSem.length > 1;
              return blocsSem.map((bloc: any, index: number) => {
                const numeroSem = formatBlocSemantiqueNumero(
                  index,
                  blocsSem.length,
                );
                const hasEnteteSem =
                  bloc["indication-semantique-1"] ||
                  bloc["domaine-bloc-semantique"];

                return (
                <View key={index} style={style.blocSemantiqueContainer}>
                  {hasEnteteSem ? (
                    <Text
                      style={[
                        style.text,
                        style.blocSemIndication,
                        { fontWeight: "600", marginBottom: 8 },
                      ]}
                    >
                      {numeroSem}
                      {bloc["indication-semantique-1"]}
                      {bloc["domaine-bloc-semantique"] && (
                        <Text style={[style.text, style.blocSemDomaine]}>
                          {" "}
                          ({bloc["domaine-bloc-semantique"]})
                        </Text>
                      )}
                    </Text>
                  ) : (
                    hasMultipleBlocsSem && (
                      <Text
                        style={[
                          style.text,
                          style.blocSemIndication,
                          { fontWeight: "600", marginBottom: 8 },
                        ]}
                      >
                        {numeroSem.trim()}
                      </Text>
                    )
                  )}

                  {/* Registre du sens vedette */}
                  {bloc["registre-sens-ved"] && (
                    <Text
                      style={[
                        style.text,
                        {
                          fontSize: 12,
                          color: "#666",
                          fontStyle: "italic",
                          marginBottom: 4,
                        },
                      ]}
                    >
                      Registre: {bloc["registre-sens-ved"]}
                    </Text>
                  )}

                  {/* Sous-blocs sémantiques : indications et équivalents sur une même ligne */}
                  {bloc["sous-blocs-semantiques"] &&
                    bloc["sous-blocs-semantiques"].map(
                      (sousBloc: any, sousIndex: number) => {
                        const blocsContextuels =
                          sousBloc["blocs-contextuels"] || [];
                        const indicationSem2 =
                          sousBloc["indication-semantique-2"];
                        const sem2LineIndex = indicationSem2
                          ? blocsContextuels.findIndex(
                              (ctx: any) =>
                                (ctx["blocs-equivalents"]?.length ?? 0) > 0,
                            )
                          : -1;

                        return (
                          <View
                            key={sousIndex}
                            style={style.sousBlocSemantiqueContainer}
                          >
                            {blocsContextuels.map(
                              (blocContextuel: any, contextIndex: number) => (
                                <LigneEquivalents
                                  key={contextIndex}
                                  style={style}
                                  indicationSemantique2={indicationSem2}
                                  showIndicationSemantique2={
                                    contextIndex === sem2LineIndex
                                  }
                                  indicationContextuelle={
                                    blocContextuel["indication-contextuel"]
                                  }
                                  blocsEquivalents={
                                    blocContextuel["blocs-equivalents"] || []
                                  }
                                />
                              ),
                            )}
                          </View>
                        );
                      },
                    )}

                  {/* Exemples du bloc */}
                  {bloc.exemples &&
                    bloc.exemples.length > 0 &&
                    bloc.exemples.map((exemple: any, exempleIndex: number) => (
                      <View key={exempleIndex} style={style.exempleItem}>
                        {/* Exemple estonien */}
                        {exemple["exemple-est"] && (
                          <Text style={[style.text, style.exempleEstonien]}>
                            {exemple["proverbe-exemple-est"] === "true" && "◊ "}
                            {exemple["exemple-est"]}
                          </Text>
                        )}

                        {/* Registre et domaine de l'exemple */}
                        {(exemple["registre-exe-est"] ||
                          exemple["domaine-exe-est"]) && (
                          <Text
                            style={[
                              style.text,
                              {
                                fontSize: 12,
                                color: "#666",
                                fontStyle: "italic",
                              },
                            ]}
                          >
                            {[
                              exemple["registre-exe-est"],
                              exemple["domaine-exe-est"],
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </Text>
                        )}

                        {/* Traductions françaises */}
                        {exemple["blocs-traduction-exe"]?.map(
                          (trad: any, tradIndex: number) => (
                            <View key={tradIndex}>
                              {trad["indic-sem-exe"] && (
                                <Text
                                  style={[
                                    style.text,
                                    {
                                      fontSize: 12,
                                      color: "#666",
                                      fontStyle: "italic",
                                    },
                                  ]}
                                >
                                  {trad["indic-sem-exe"]}
                                </Text>
                              )}
                              {trad["traduction-exe"] && (
                                <Text
                                  style={[style.text, style.exempleFrancais]}
                                >
                                  {trad["proverbe-traduction-exe"] === "true" &&
                                    "◊ "}
                                  {trad["traduction-exe"]}
                                </Text>
                              )}
                              {trad["registre-trad-exe"] && (
                                <Text
                                  style={[
                                    style.text,
                                    {
                                      fontSize: 12,
                                      color: "#666",
                                      fontStyle: "italic",
                                    },
                                  ]}
                                >
                                  Registre: {trad["registre-trad-exe"]}
                                </Text>
                              )}
                            </View>
                          ),
                        )}
                      </View>
                    ))}
                </View>
                );
              });
            })()}
        </View>
      ))}

      {/* EXPRESSIONS PHRASÉOLOGIQUES */}
      {(() => {
        // Vérifier s'il y a des expressions avec du contenu réel
        const expressionsValides =
          fullArticle["blocs-phraseologiques"]?.filter(
            (expr: any) =>
              expr["expression-est"] ||
              (expr["blocs-traduction-expr"] &&
                expr["blocs-traduction-expr"].length > 0 &&
                expr["blocs-traduction-expr"].some(
                  (trad: any) => trad["traduction-expr"],
                )),
          ) || [];

        return (
          expressionsValides.length > 0 && (
            <View style={style.expressionsContainer}>
              <Text style={[style.text, style.blocSemIndication]}>
                Expressions phraséologiques
              </Text>
              {expressionsValides.map((expr: any, index: number) => (
                <View key={index} style={style.expressionItem}>
                  {/* Expression estonienne */}
                  {expr["expression-est"] && (
                    <Text style={[style.text, style.expressionEstonienne]}>
                      {expr["expression-est"]}
                    </Text>
                  )}

                  {/* Registre de l'expression */}
                  {expr["registre-expression-est"] && (
                    <Text
                      style={[
                        style.text,
                        { fontSize: 12, color: "#666", fontStyle: "italic" },
                      ]}
                    >
                      Registre: {expr["registre-expression-est"]}
                    </Text>
                  )}

                  {/* Traductions */}
                  {expr["blocs-traduction-expr"] &&
                    expr["blocs-traduction-expr"].length > 0 && (
                      <View style={style.traductionExpressionContainer}>
                        {expr["blocs-traduction-expr"].map(
                          (trad: any, tradIndex: number) => (
                            <View
                              key={tradIndex}
                              style={style.traductionExpressionItem}
                            >
                              {/* Indication sémantique de l'expression */}
                              {trad["indic-sem-expr"] && (
                                <Text
                                  style={[style.text, style.indicationSemExpr]}
                                >
                                  {trad["indic-sem-expr"]}
                                </Text>
                              )}

                              {/* Traduction française */}
                              {trad["traduction-expr"] && (
                                <Text
                                  style={[
                                    style.text,
                                    style.expressionFrancaise,
                                  ]}
                                >
                                  {trad["locution-traduction-expr"] === "true" && "◦ "}
                                  {trad["traduction-expr"]}
                                </Text>
                              )}

                              {/* Registre de la traduction */}
                              {trad["registre-trad-expr"] && (
                                <Text
                                  style={[
                                    style.text,
                                    {
                                      fontSize: 12,
                                      color: "#666",
                                      fontStyle: "italic",
                                    },
                                  ]}
                                >
                                  Registre trad.: {trad["registre-trad-expr"]}
                                </Text>
                              )}

                              {/* Rection de traduction */}
                              {(trad["rection-trad"]?.["rection-trad-est"] ||
                                trad["rection-trad"]?.["rection-trad-fra"]) && (
                                <Text style={style.text}>
                                  {trad["rection-trad"]["rection-trad-est"] && (
                                    <Text style={style.exempleEstonien}>
                                      {trad["rection-trad"]["rection-trad-est"]}
                                    </Text>
                                  )}
                                  {trad["rection-trad"]["rection-trad-est"] &&
                                    trad["rection-trad"]["rection-trad-fra"] &&
                                    ", "}
                                  {trad["rection-trad"]["rection-trad-fra"] && (
                                    <Text style={style.exempleFrancais}>
                                      {trad["rection-trad"]["rection-trad-fra"]}
                                    </Text>
                                  )}
                                </Text>
                              )}
                            </View>
                          ),
                        )}
                      </View>
                    )}

                  {/* Renvois phraséologiques */}
                  {expr["blocs-renvois"] &&
                    expr["blocs-renvois"].length > 0 && (
                      <View style={style.renvoiContainer}>
                        <Text style={[style.text, style.renvoiText]}>
                          Renvois:{" "}
                          {expr["blocs-renvois"]
                            .map((renvoi: any) => renvoi["renvoi-phraseol"])
                            .filter(Boolean)
                            .join(", ")}
                        </Text>
                      </View>
                    )}
                </View>
              ))}
            </View>
          )
        );
      })()}
    </ScrollView>
  );
}

// Mémoïser le composant pour éviter les re-rendus inutiles
export default React.memo(DetailMot);

import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { BlocSemantique } from "../_components/BlocSemantique";
import { ExpressionsPhraseo } from "../_components/ExpressionsPhraseo";
import { useDictionnaire } from "../contexts/DictionnaireContext";
import { globalStyles } from "../styles";
import {
  formatBlocGramLabel,
  formatCatGramsDisplay,
  getBlocsGram,
  shouldShowVedetteType,
} from "../_utils/blocsGram";

function DetailMot() {
  const params = useLocalSearchParams();
  const articleId = params.articleId as string;
  const style = globalStyles(false);
  const router = useRouter();
  const { articlesById, articlesByMot } = useDictionnaire();

  const fullArticle = useMemo(() => {
    return articlesById.get(articleId) ?? articlesByMot.get(articleId);
  }, [articleId, articlesById, articlesByMot]);

  const blocsGram = useMemo(
    () => (fullArticle ? getBlocsGram(fullArticle) : []),
    [fullArticle],
  );

  const catGramDisplay = fullArticle
    ? formatCatGramsDisplay(fullArticle)
    : undefined;
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

        {fullArticle.vedette.variante && fullArticle.vedette.variante !== "" && (
          <Text style={[style.text, { fontStyle: "italic" }]}>
            Variante: {fullArticle.vedette.variante}
          </Text>
        )}

        {shouldShowVedetteType(fullArticle.vedette.type) && (
          <Text style={[style.text, style.vedetteType]}>
            Type: {fullArticle.vedette.type}
          </Text>
        )}

        {fullArticle.vedette["bloc-morph"]?.formes && (
          <View style={style.blocMorphContainer}>
            <Text style={style.text}>
              {fullArticle.vedette["bloc-morph"].formes}
            </Text>
          </View>
        )}

        {fullArticle.vedette["registre-vedette"] && (
          <Text style={[style.text, style.domainRegistre]}>
            {fullArticle.vedette["registre-vedette"]}
          </Text>
        )}
        {fullArticle.vedette["domaine-vedette"] && (
          <Text style={[style.text, style.domainRegistre]}>
            {fullArticle.vedette["domaine-vedette"]}
          </Text>
        )}
      </View>

      {/* BLOC(S) GRAMMATICAL(AUX) ET BLOCS SÉMANTIQUES */}
      {blocsGram.map((blocGram, bgIndex) => (
        <View key={bgIndex} style={[style.blocGramContainer, { padding: 16 }]}>
          {hasMultipleBlocsGram && blocGram["cat-gram"] && (
            <Text style={[style.text, style.blocGramLabel]}>
              {formatBlocGramLabel(bgIndex, blocGram["cat-gram"])}
            </Text>
          )}

          {blocGram["registre-bloc-gram"] && (
            <Text style={[style.text, style.registreBlocGram]}>
              {blocGram["registre-bloc-gram"]}
            </Text>
          )}
          {blocGram["domaine-bloc-gram"] && (
            <Text style={[style.text, style.domaineBlocGram]}>
              {blocGram["domaine-bloc-gram"]}
            </Text>
          )}

          {(blocGram["blocs-semantiques"] as any[] | undefined)?.map(
            (bloc: any, index: number, arr: any[]) => (
              <BlocSemantique
                key={index}
                bloc={bloc}
                index={index}
                total={arr.length}
                style={style}
              />
            ),
          )}
        </View>
      ))}

      {/* EXPRESSIONS PHRASÉOLOGIQUES */}
      {fullArticle["blocs-phraseologiques"]?.length > 0 && (
        <ExpressionsPhraseo
          blocs={fullArticle["blocs-phraseologiques"]}
          style={style}
        />
      )}
    </ScrollView>
  );
}

export default React.memo(DetailMot);

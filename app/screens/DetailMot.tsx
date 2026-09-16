import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { AppBackground } from "@/components/AppBackground";
import { BlocSemantique } from "@/components/BlocSemantique";
import {
  ExpressionsPhraseo,
  hasExpressionsPhraseo,
} from "@/components/ExpressionsPhraseo";
import { GlassSurface } from "@/components/GlassSurface";
import { useDictionnaire } from "@/contexts/DictionnaireContext";
import { globalStyles, semanticColors } from "@/styles";
import {
  formatBlocGramLabel,
  formatCatGramsDisplay,
  getBlocsGram,
  shouldShowVedetteType,
} from "@/utils/blocsGram";
import { goBack, useStackScrollPaddingTop } from "@/utils/navigation";
import { useIsDarkMode } from "@/utils/useIsDarkMode";

function DetailMot() {
  const params = useLocalSearchParams();
  const articleId = params.articleId as string;
  const isDark = useIsDarkMode();
  const style = globalStyles(isDark);
  const router = useRouter();
  const scrollPaddingTop = useStackScrollPaddingTop();
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
      <AppBackground>
        <ScrollView
          style={{ flex: 1, backgroundColor: "transparent" }}
          contentInsetAdjustmentBehavior="never"
          contentContainerStyle={{
            padding: 16,
            paddingTop: scrollPaddingTop,
          }}
        >
          <GlassSurface
            style={style.vedetteContainer}
            contentStyle={style.vedetteContainerInner}
          >
            <Text style={style.text}>
              ❌ Article non trouvé pour: {articleId}
            </Text>
            <TouchableOpacity onPress={() => goBack(router)}>
              <Text
                style={[
                  style.text,
                  { color: semanticColors(isDark).accentBlue, marginTop: 20 },
                ]}
              >
                ← Retour
              </Text>
            </TouchableOpacity>
          </GlassSurface>
        </ScrollView>
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <ScrollView
        style={{ flex: 1, backgroundColor: "transparent" }}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 32,
          paddingTop: scrollPaddingTop,
        }}
      >
        {/* VEDETTE */}
        <GlassSurface
          style={style.vedetteContainer}
          contentStyle={style.vedetteContainerInner}
        >
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
        </GlassSurface>

      {/* BLOC(S) GRAMMATICAL(AUX) ET BLOCS SÉMANTIQUES */}
      {blocsGram.map((blocGram, bgIndex) => (
        <GlassSurface
          key={bgIndex}
          style={style.blocGramContainer}
          contentStyle={style.blocGramContainerInner}
        >
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
        </GlassSurface>
      ))}

      {/* EXPRESSIONS PHRASÉOLOGIQUES (carte seulement si contenu affichable) */}
      {hasExpressionsPhraseo(fullArticle["blocs-phraseologiques"]) && (
        <GlassSurface
          style={style.expressionsContainer}
          contentStyle={style.expressionsContainerInner}
        >
          <ExpressionsPhraseo
            blocs={fullArticle["blocs-phraseologiques"]}
            style={style}
          />
        </GlassSurface>
      )}
      </ScrollView>
    </AppBackground>
  );
}

export default React.memo(DetailMot);

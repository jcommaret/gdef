import React from "react";
import { Text, View } from "react-native";

import { FormattedText } from "./FormattedText";
import { LigneEquivalents } from "./LigneEquivalents";
import { formatBlocSemantiqueNumero } from "../../utils/blocsGram";
import type { Styles } from "../styles";

interface BlocSemantiqueProps {
  bloc: any;
  index: number;
  total: number;
  style: Styles;
}

export function BlocSemantique({ bloc, index, total, style }: BlocSemantiqueProps) {
  const numeroSem = formatBlocSemantiqueNumero(index, total);
  const hasEnteteSem =
    bloc["indication-semantique-1"] || bloc["domaine-bloc-semantique"];
  const hasMultiple = total > 1;

  return (
    <View style={style.blocSemantiqueContainer}>
      {hasEnteteSem ? (
        <Text
          style={[style.text, style.blocSemIndication, style.blocSemIndicationHeader]}
        >
          {numeroSem}
          {bloc["indication-semantique-1"]}
          {bloc["domaine-bloc-semantique"] && (
            <Text style={[style.text, style.blocSemDomaine]}>
              {" "}({bloc["domaine-bloc-semantique"]})
            </Text>
          )}
        </Text>
      ) : (
        hasMultiple && (
          <Text
            style={[style.text, style.blocSemIndication, style.blocSemIndicationHeader]}
          >
            {numeroSem.trim()}
          </Text>
        )
      )}

      {bloc["registre-sens-ved"] && (
        <Text style={[style.text, style.domainRegistre, { marginBottom: 4 }]}>
          {bloc["registre-sens-ved"]}
        </Text>
      )}

      {bloc["sous-blocs-semantiques"]?.map((sousBloc: any, sousIndex: number) => {
        const blocsContextuels = sousBloc["blocs-contextuels"] || [];
        const indicationSem2 = sousBloc["indication-semantique-2"];
        const sem2LineIndex = indicationSem2
          ? blocsContextuels.findIndex(
              (ctx: any) => (ctx["blocs-equivalents"]?.length ?? 0) > 0,
            )
          : -1;

        return (
          <View key={sousIndex} style={style.sousBlocSemantiqueContainer}>
            {blocsContextuels.map((blocContextuel: any, contextIndex: number) => (
              <LigneEquivalents
                key={contextIndex}
                style={style}
                indicationSemantique2={indicationSem2}
                showIndicationSemantique2={contextIndex === sem2LineIndex}
                indicationContextuelle={blocContextuel["indication-contextuel"]}
                blocsEquivalents={blocContextuel["blocs-equivalents"] || []}
              />
            ))}
          </View>
        );
      })}

      {bloc.exemples?.map((exemple: any, exempleIndex: number) => (
        <View key={exempleIndex} style={style.exempleItem}>
          {exemple["exemple-est"] && (
            <View style={style.flexRowWrap}>
              <FormattedText
                text={
                  (exemple["proverbe-exemple-est"] === "true" ? "◊ " : "") +
                  exemple["exemple-est"]
                }
                style={[style.text, style.exempleEstonien]}
              />
              {(exemple["registre-exe-est"] || exemple["domaine-exe-est"]) && (
                <Text style={[style.text, style.domainRegistre]}>
                  {" ("}
                  {[exemple["registre-exe-est"], exemple["domaine-exe-est"]]
                    .filter(Boolean)
                    .join(", ")}
                  {")"}
                </Text>
              )}
            </View>
          )}

          {exemple["blocs-traduction-exe"]?.map((trad: any, tradIndex: number) => (
            <View key={tradIndex}>
              {trad["indic-sem-exe"] && (
                <Text style={[style.text, style.indicSemExemple]}>
                  {trad["indic-sem-exe"]}
                </Text>
              )}
              {trad["traduction-exe"] && (
                <FormattedText
                  text={
                    (trad["proverbe-traduction-exe"] === "true" ? "◊ " : "") +
                    trad["traduction-exe"]
                  }
                  style={[style.text, style.exempleFrancais]}
                />
              )}
              {trad["registre-trad-exe"] && (
                <Text style={[style.text, style.domainRegistre]}>
                  {trad["registre-trad-exe"]}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
export default BlocSemantique;

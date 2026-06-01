import React from "react";
import { Text, View } from "react-native";

import type { Styles } from "../styles";

interface LigneEquivalentsProps {
  style: Styles;
  blocsEquivalents: any[];
  indicationSemantique2?: string;
  showIndicationSemantique2?: boolean;
  indicationContextuelle?: string;
}

/** Équivalents sur une ligne, précédés des indications (parenthèses / crochets). */
export function LigneEquivalents({
  style,
  blocsEquivalents,
  indicationSemantique2,
  showIndicationSemantique2,
  indicationContextuelle,
}: LigneEquivalentsProps) {
  if (!blocsEquivalents?.length) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-end",
        marginBottom: 6,
      }}
    >
      {showIndicationSemantique2 && indicationSemantique2 && (
        <Text style={style.indicationSemantique2}>
          ({indicationSemantique2}){" "}
        </Text>
      )}
      {indicationContextuelle && (
        <Text style={style.indicationContextuelle}>
          [{indicationContextuelle}]{" "}
        </Text>
      )}
      {blocsEquivalents.map((equiv: any, idx: number) => {
        const motFr = equiv["article-francais"]?.vedette?.mot;
        const grammaire = equiv["article-francais"]?.vedette?.grammaire;
        const plurielIrr = grammaire?.["pluriel-irr"];
        const feminIrr = grammaire?.["feminin-irr"];
        const hasEquivMot = Boolean(
          equiv.avant || motFr || equiv.apres || equiv["rection-equiv"],
        );

        return (
          <React.Fragment key={idx}>
            {idx > 0 && <Text style={style.text}>{", "}</Text>}
            {equiv.avant && (
              <Text style={style.equivalentsFrancais}>{equiv.avant} </Text>
            )}
            {motFr && (
              <Text style={style.equivalentsFrancais}>{motFr}</Text>
            )}
            {grammaire?.["genre-nbr"] && (
              <Text style={style.genreExposant}>
                {grammaire["genre-nbr"]}
              </Text>
            )}
            {equiv.apres && (
              <Text style={style.equivalentsFrancais}> {equiv.apres}</Text>
            )}
            {equiv["rection-equiv"]?.["rection-equiv-est"] && (
              <Text style={style.exempleEstonien}>
                {" "}{equiv["rection-equiv"]["rection-equiv-est"]}
              </Text>
            )}
            {equiv["rection-equiv"]?.["rection-equiv-fra"] && (
              <Text style={style.exempleFrancais}>
                {" "}{equiv["rection-equiv"]["rection-equiv-fra"]}
              </Text>
            )}
            {plurielIrr && (
              <>
                <Text style={style.text}>{", "}</Text>
                <Text style={style.equivalentsFrancais}>{plurielIrr}</Text>
                <Text style={style.formeIrreguliere}> (pl.)</Text>
              </>
            )}
            {feminIrr && (
              <>
                <Text style={style.text}>{", "}</Text>
                <Text style={style.equivalentsFrancais}>{feminIrr}</Text>
                <Text style={style.formeIrreguliere}> (f.)</Text>
              </>
            )}
            {equiv.explication && (
              <Text style={style.explicationEquiv}>
                {hasEquivMot ? " " : ""}({equiv.explication})
              </Text>
            )}
            {equiv["registre-equiv"] && (
              <Text style={style.equivalentsFrancais}>
                {" "}[{equiv["registre-equiv"]}]
              </Text>
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

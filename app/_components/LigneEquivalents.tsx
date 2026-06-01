import React from "react";
import { Text } from "react-native";

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
    <Text style={[style.text, style.ligneEquivalents]}>
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
          <Text key={idx}>
            {idx > 0 && ", "}
            {hasEquivMot && (
              <Text style={style.equivalentsFrancais}>
                {equiv.avant && `${equiv.avant} `}
                {motFr}
                {equiv.apres && ` ${equiv.apres}`}
                {grammaire?.["genre-nbr"] && (
                  <Text style={style.genreExposant}>
                    {" "}({grammaire["genre-nbr"]})
                  </Text>
                )}
              </Text>
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
              <Text>
                {", "}
                <Text style={style.equivalentsFrancais}>{plurielIrr}</Text>
                <Text style={style.formeIrreguliere}> (pl.)</Text>
              </Text>
            )}
            {feminIrr && (
              <Text>
                {", "}
                <Text style={style.equivalentsFrancais}>{feminIrr}</Text>
                <Text style={style.formeIrreguliere}> (f.)</Text>
              </Text>
            )}
            {equiv.explication && (
              <Text style={style.explicationEquiv}>
                {hasEquivMot ? " " : ""}({equiv.explication})
              </Text>
            )}
            {equiv["registre-equiv"] && (
              <Text style={style.equivalentsFrancais}>
                {" "}
                [{equiv["registre-equiv"]}]
              </Text>
            )}
          </Text>
        );
      })}
    </Text>
  );
}

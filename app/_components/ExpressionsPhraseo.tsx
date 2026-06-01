import React from "react";
import { Text, View } from "react-native";

import { FormattedText } from "./FormattedText";
import type { Styles } from "../styles";

interface ExpressionsPhraseoProps {
  blocs: any[];
  style: Styles;
}

export function ExpressionsPhraseo({ blocs, style }: ExpressionsPhraseoProps) {
  const valides = blocs.filter(
    (expr) =>
      expr["expression-est"] ||
      expr["blocs-traduction-expr"]?.some((t: any) => t["traduction-expr"]),
  );

  if (valides.length === 0) return null;

  return (
    <View style={style.expressionsContainer}>
      <Text style={[style.text, style.blocSemIndication]}>
        Expressions phraséologiques
      </Text>
      {valides.map((expr: any, index: number) => (
        <View key={index} style={style.expressionItem}>
          {expr["expression-est"] && (
            <FormattedText
              text={expr["expression-est"]}
              style={[style.text, style.expressionEstonienne]}
            />
          )}

          {expr["registre-expression-est"] && (
            <Text style={[style.text, style.domainRegistre]}>
              {expr["registre-expression-est"]}
            </Text>
          )}

          {expr["blocs-traduction-expr"]?.length > 0 && (
            <View style={style.traductionExpressionContainer}>
              {expr["blocs-traduction-expr"].map((trad: any, tradIndex: number) => (
                <View key={tradIndex} style={style.traductionExpressionItem}>
                  {trad["indic-sem-expr"] && (
                    <Text style={[style.text, style.indicationSemExpr]}>
                      {trad["indic-sem-expr"]}
                    </Text>
                  )}

                  {trad["traduction-expr"] && (
                    <Text style={[style.text, style.expressionFrancaise]}>
                      {trad["locution-traduction-expr"] === "true" && "◦ "}
                      {trad["traduction-expr"]}
                    </Text>
                  )}

                  {trad["registre-trad-expr"] && (
                    <Text style={[style.text, style.domainRegistre]}>
                      {trad["registre-trad-expr"]}
                    </Text>
                  )}

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
              ))}
            </View>
          )}

          {expr["blocs-renvois"]?.length > 0 && (
            <View style={style.renvoiContainer}>
              <Text style={[style.text, style.renvoiText]}>
                Renvois:{" "}
                {expr["blocs-renvois"]
                  .map((r: any) => r["renvoi-phraseol"])
                  .filter(Boolean)
                  .join(", ")}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
export default ExpressionsPhraseo;

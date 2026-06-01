import { Article, BlocGram } from "../_types/dictionary";

/** Chiffres romains pour numéroter les blocs grammaticaux (I, II, III…). */
export function toRomanNumeral(n: number): string {
  if (n < 1) return "";
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const numerals = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];
  let num = n;
  let result = "";
  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += numerals[i];
      num -= values[i];
    }
  }
  return result;
}

/** Libellé d'un bloc grammatical : « I konj. », « II adv. », etc. */
export function formatBlocGramLabel(index: number, catGram?: string): string {
  const roman = toRomanNumeral(index + 1);
  return catGram ? `${roman} ${catGram}` : roman;
}

/** Retourne tous les blocs grammaticaux d'un article (ancien ou nouveau format JSON). */
export function getBlocsGram(article: Article): BlocGram[] {
  const blocs = article["blocs-gram"];
  if (blocs && blocs.length > 0) {
    return blocs;
  }
  const single = article["bloc-gram"];
  return single ? [single] : [];
}

/** Préfixe numérique d'un bloc sémantique (« 1. », « 2. »…) si plusieurs blocs. */
export function formatBlocSemantiqueNumero(
  index: number,
  total: number,
): string {
  return total > 1 ? `${index + 1}. ` : "";
}

/** Vrai si le type de vedette mérite d'être affiché. */
export function shouldShowVedetteType(type?: string): boolean {
  return Boolean(
    type && !["lsnonflechi", "lcompose", "vap"].includes(type),
  );
}

/** Équivalents français d'un article regroupés par contexte, pour la liste. */
export function getEquivalentsWithContext(
  article: Article,
): { indication: string; equivalents: string[] }[] {
  const contexts: { indication: string; equivalents: string[] }[] = [];
  getBlocsGram(article).forEach((blocGram) => {
    const blocs: any[] = (blocGram as any)["blocs-semantiques"] || [];
    blocs.forEach((bloc) => {
      bloc["sous-blocs-semantiques"]?.forEach((sb: any) => {
        sb["blocs-contextuels"]?.forEach((ctx: any) => {
          const indication: string = ctx["indication-contextuel"] || "";
          const equivs: string[] = [];
          ctx["blocs-equivalents"]?.forEach((eq: any) => {
            const motFr = eq["article-francais"]?.vedette?.mot;
            const grammaire = eq["article-francais"]?.vedette?.grammaire;
            if (motFr) {
              equivs.push(
                (eq.avant ? `${eq.avant} ` : "") +
                  motFr +
                  (eq.apres ? ` ${eq.apres}` : ""),
              );
              if (grammaire?.["pluriel-irr"])
                equivs.push(`${grammaire["pluriel-irr"]} (pl.)`);
              if (grammaire?.["feminin-irr"])
                equivs.push(`${grammaire["feminin-irr"]} (f.)`);
            } else if (eq.avant || eq.apres) {
              const s = (eq.avant || "") + (eq.apres ? ` ${eq.apres}` : "");
              if (s) equivs.push(s);
            }
          });
          if (equivs.length > 0) contexts.push({ indication, equivalents: equivs });
        });
      });
    });
  });
  return contexts;
}

/** Libellé des catégories grammaticales pour la vedette ou la liste. */
export function formatCatGramsDisplay(article: Article): string | undefined {
  const blocs = getBlocsGram(article);
  if (blocs.length === 0) return undefined;
  if (blocs.length === 1) {
    return blocs[0]["cat-gram"];
  }
  return blocs
    .map((b, i) => formatBlocGramLabel(i, b["cat-gram"]))
    .filter(Boolean)
    .join(", ");
}

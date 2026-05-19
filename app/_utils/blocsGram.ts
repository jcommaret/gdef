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

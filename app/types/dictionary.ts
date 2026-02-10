// Types centralisés pour le dictionnaire

// Interface Vedette pour les propriétés de la vedette
export interface Vedette {
  mot: string;
  variante?: string;
  type?: string;
  particule?: string;
  hm?: string;
  "bloc-morph"?: any;
  "registre-vedette"?: string;
  "domaine-vedette"?: string;
  grammaire?: {
    "cat-gram"?: string;
    "genre-nbr"?: string;
    "pluriel-irr"?: string;
    "feminin-irr"?: string;
    "conjugaison"?: string;
    "aux-etre"?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Interface pour les blocs grammaticaux
export interface BlocGram {
  "cat-gram"?: string;
  "registre-bloc-gram"?: string;
  "domaine-bloc-gram"?: string;
  "blocs-semantiques"?: BlocSemantique[];
  [key: string]: any;
}

// Interface pour les blocs sémantiques
export interface BlocSemantique {
  "numero-bloc-semantique"?: string;
  "indication-semantique-1"?: string;
  "domaine-bloc-semantique"?: string;
  "registre-bloc-semantique"?: string;
  "sous-blocs-semantiques"?: SousBlocSemantique[];
  [key: string]: any;
}

// Interface pour les sous-blocs sémantiques
export interface SousBlocSemantique {
  "indication-semantique-2"?: string;
  "blocs-contextuels"?: BlocContextuel[];
  [key: string]: any;
}

// Interface pour les blocs contextuels
export interface BlocContextuel {
  "indication-contextuelle"?: string;
  "equivalents"?: Equivalent[];
  [key: string]: any;
}

// Interface pour les équivalents
export interface Equivalent {
  "mot-equiv"?: string;
  "genre-nbr"?: string;
  "indication-contextuelle"?: string;
  [key: string]: any;
}

// Interface Article complète
export interface Article {
  id: string;
  vedette: Vedette;
  "bloc-gram"?: BlocGram;
  [key: string]: any;
}

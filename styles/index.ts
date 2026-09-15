import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import type { Theme } from "expo-router/react-navigation";

import { getGlass } from "./glass";

// Constantes de couleurs pour uniformiser les styles
const COLORS = {
  primary: "#007AFF",
  secondary: "#666",
  tertiary: "#8E8E93",
  estonien: "#d73527",
  francais: "#007AFF",
  text: "#000",
  /** Noir plein pour les explications (éviter l’aspect grisé de l’italique système). */
  explication: "#000000",
  textLight: "#8E8E93",
  border: "rgba(0, 0, 0, 0.12)",
  borderLight: "rgba(200, 200, 200, 0.5)",
  background: "transparent",
  cardBackground: getGlass(false).fill,
  cardBackgroundLight: getGlass(false).listItemFill,
  searchBackground: "transparent",
  white: "#ffffff",
};

export interface Styles {
  text: TextStyle;
  vedetteContainer: ViewStyle;
  vedetteContainerInner: ViewStyle;
  vedetteParticule: TextStyle;
  vedetteCatGram: TextStyle;
  vedetteType: TextStyle;
  vedetteHm: TextStyle;
  genreExposant: TextStyle;
  blocGramContainer: ViewStyle;
  blocGramContainerInner: ViewStyle;
  blocSemantiqueContainer: ViewStyle;
  blocSemIndication: TextStyle;
  blocSemIndicationHeader: TextStyle;
  blocSemDomaine: TextStyle;
  indicSemExemple: TextStyle;
  flexRowWrap: ViewStyle;
  itemText: TextStyle;
  searchContainer: ViewStyle;
  searchBar: ViewStyle;
  searchIcon: ViewStyle;
  searchInput: TextStyle;
  clearButton: ViewStyle;
  listContent: ViewStyle;
  footerContainer: ViewStyle;
  itemContainer: ViewStyle;
  itemLeftColumn: ViewStyle;
  itemHeaderRow: ViewStyle;
  itemMotText: TextStyle;
  itemCatGram: TextStyle;
  itemEquivalents: TextStyle;
  itemInfoButton: TextStyle;
  loadingContainer: ViewStyle;
  loadingText: TextStyle;
  loadingFullScreen: ViewStyle;
  loadingFullScreenText: TextStyle;
  mainContainer: ViewStyle;
  searchIconWeb: TextStyle;
  clearIconWeb: TextStyle;
  blocMorphContainer: ViewStyle;
  sousBlocSemantiqueContainer: ViewStyle;
  ligneEquivalents: TextStyle;
  indicationSemantique2: TextStyle;
  indicationContextuelle: TextStyle;
  equivalentsFrancais: TextStyle;
  explicationEquiv: TextStyle;
  registreBlocGram: TextStyle;
  domaineBlocGram: TextStyle;
  blocGramLabel: TextStyle;
  traductionExpressionContainer: ViewStyle;
  traductionExpressionItem: ViewStyle;
  indicationSemExpr: TextStyle;
  formeIrreguliere: TextStyle;
  domainRegistre: TextStyle;
  renvoiContainer: ViewStyle;
  renvoiText: TextStyle;
  exempleItem: ViewStyle;
  exempleEstonien: TextStyle;
  exempleFrancais: TextStyle;
  exempleDomaine: TextStyle;
  expressionItem: ViewStyle;
  expressionsContainer: ViewStyle;
  expressionsContainerInner: ViewStyle;
  expressionEstonienne: TextStyle;
  expressionFrancaise: TextStyle;
}

/** Couleurs de texte / surfaces pour pages statiques et ajustements locaux. */
export function semanticColors(isDarkMode: boolean) {
  return {
    textPrimary: isDarkMode ? "#f2f2f7" : "#1c1c1e",
    textBody: isDarkMode ? "#e5e5ea" : "#333333",
    textSecondary: isDarkMode ? "#98989f" : "#666666",
    textMuted: isDarkMode ? "#8e8e93" : "#555555",
    textFooter: isDarkMode ? "#636366" : "#888888",
    borderHairline: isDarkMode ? "rgba(255,255,255,0.14)" : "#cccccc",
    cardSurface: isDarkMode ? "rgba(44, 46, 58, 0.78)" : "#f5f5f7",
    placeholder: isDarkMode ? "#8e8e93" : "#8E8E93",
    linkMuted: isDarkMode ? "#98989f" : "#5c6570",
  };
}

export const createNavigationTheme = (isDarkMode: boolean): Theme => ({
  dark: isDarkMode,
  colors: {
    primary: COLORS.primary,
    background: isDarkMode ? COLORS.text : COLORS.white,
    card: isDarkMode ? "#1a1a1a" : COLORS.white,
    text: isDarkMode ? COLORS.white : COLORS.text,
    border: isDarkMode ? "#333333" : COLORS.borderLight,
    notification: COLORS.primary,
  },
  fonts: {
    regular: {
      fontFamily: "System",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "System",
      fontWeight: "500",
    },
    bold: {
      fontFamily: "System",
      fontWeight: "700",
    },
    heavy: {
      fontFamily: "System",
      fontWeight: "900",
    },
  },
});

export const globalStyles = (isDarkMode: boolean) => {
  const glass = getGlass(isDarkMode);
  const textPrimary = isDarkMode ? "#f2f2f7" : COLORS.text;
  const textSecondary = isDarkMode ? "#98989f" : COLORS.secondary;

  return StyleSheet.create({
    searchContainer: {
      padding: 16,
      paddingBottom: 12,
      backgroundColor: "transparent",
    },
    searchBar: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      paddingHorizontal: 12,
      minHeight: 44,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      height: 40,
      fontSize: 16,
      color: textPrimary,
    },
    clearButton: {
      padding: 4,
    },
    listContent: {
      paddingBottom: 16,
    },
    itemText: {
      backgroundColor: glass.listItemFill,
      padding: 20,
      marginHorizontal: 12,
      marginVertical: 4,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: glass.borderSubtle,
      overflow: "hidden",
    },
    vedetteContainer: {
      marginBottom: 16,
    },
    vedetteContainerInner: {
      padding: 16,
    },
    blocGramContainer: {
      marginBottom: 12,
    },
    blocGramContainerInner: {
      padding: 16,
    },
    blocSemantiqueContainer: {
      paddingTop: 20,
      paddingBottom: 8,
    },
    text: {
      fontSize: 14,
      marginBottom: 4,
      color: textPrimary,
      marginRight: 5,
    },
    footerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 30,
    },
    vedetteParticule: {
      color: textSecondary,
    },
    vedetteCatGram: {
      fontSize: 12,
      color: textSecondary,
      fontStyle: "italic",
    },
    vedetteType: {
      fontSize: 14,
      color: textSecondary,
    },
    vedetteHm: {
      fontSize: 13,
      fontWeight: "700",
      color: textPrimary,
    },
    genreExposant: {
      fontSize: 10,
      fontStyle: "italic",
      color: textSecondary,
      alignSelf: "flex-start",
      marginLeft: 3,
    },
    blocSemIndication: {
      color: textPrimary,
      fontWeight: "500",
    },
    blocSemIndicationHeader: {
      fontWeight: "600",
      marginBottom: 8,
    },
    indicSemExemple: {
      fontSize: 12,
      color: textSecondary,
      fontStyle: "italic",
    },
    flexRowWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-end",
    },
    blocSemDomaine: {
      fontSize: 11,
      color: textSecondary,
      fontVariant: ["small-caps"],
    },
    exempleItem: {
      paddingVertical: 8,
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      borderColor: isDarkMode ? "rgba(255,255,255,0.12)" : COLORS.border,
    },
    exempleEstonien: {
      color: COLORS.estonien,
    },
    exempleFrancais: {
      color: COLORS.francais,
    },
    exempleDomaine: {
      fontSize: 11,
      color: COLORS.tertiary,
    },
    expressionItem: {
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      borderColor: isDarkMode ? "rgba(255,255,255,0.12)" : COLORS.border,
      paddingVertical: 8,
    },
    expressionsContainer: {
      marginTop: 8,
    },
    expressionsContainerInner: {
      padding: 12,
    },
    expressionEstonienne: {
      color: COLORS.estonien,
    },
    expressionFrancaise: {
      color: COLORS.francais,
    },
    // Styles pour l'index (liste des mots)
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    itemLeftColumn: {
      flexDirection: "column",
      alignItems: "flex-start",
      flex: 1,
      paddingRight: 12,
    },
    itemHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },
    itemMotText: {
      fontSize: 16,
      fontWeight: "bold",
      color: textPrimary,
    },
    itemCatGram: {
      fontSize: 12,
      color: textSecondary,
      fontStyle: "italic",
      marginLeft: 8,
    },
    itemEquivalents: {
      marginTop: 2,
      fontSize: 13,
      color: COLORS.primary,
    },
    itemInfoButton: {
      fontSize: 13,
      color: textPrimary,
      fontWeight: "bold",
    },
    loadingContainer: {
      padding: 20,
      alignItems: "center",
    },
    loadingText: {
      marginTop: 8,
      color: textSecondary,
    },
    loadingFullScreen: {
      flex: 1,
      backgroundColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
    },
    loadingFullScreenText: {
      marginTop: 10,
      fontSize: 16,
      color: textSecondary,
    },
    mainContainer: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    searchIconWeb: {
      marginRight: 8,
      color: textSecondary,
      fontSize: 16,
    },
    clearIconWeb: {
      color: textSecondary,
      fontSize: 16,
    },
    // Styles pour DetailMot
    blocMorphContainer: {
      marginTop: 8,
    },
    sousBlocSemantiqueContainer: {
      marginBottom: 8,
    },
    ligneEquivalents: {
      marginBottom: 6,
    },
    indicationSemantique2: {
      fontStyle: "italic",
      fontWeight: "400",
    },
    indicationContextuelle: {
      fontStyle: "normal",
      fontWeight: "400",
    },
    equivalentsFrancais: {
      color: COLORS.francais,
      fontWeight: "600",
    },
    explicationEquiv: {
      fontStyle: "italic",
      fontWeight: "normal",
      color: textPrimary,
      fontSize: 14,
    },
    blocGramLabel: {
      fontSize: 15,
      fontWeight: "700",
      color: textPrimary,
      marginBottom: 10,
    },
    domainRegistre: {
      fontSize: 11,
      color: textSecondary,
      fontVariant: ["small-caps"],
    },
    registreBlocGram: {
      fontSize: 11,
      color: textSecondary,
      fontVariant: ["small-caps"],
      marginBottom: 4,
    },
    domaineBlocGram: {
      fontSize: 11,
      color: textSecondary,
      fontVariant: ["small-caps"],
      marginBottom: 8,
    },
    traductionExpressionContainer: {
      marginBottom: 4,
    },
    traductionExpressionItem: {
      marginBottom: 4,
    },
    indicationSemExpr: {
      fontSize: 12,
      color: textSecondary,
      fontStyle: "italic",
    },
    formeIrreguliere: {
      fontSize: 12,
      fontStyle: "italic",
      color: textSecondary,
    },
    renvoiContainer: {
      marginLeft: 8,
    },
    renvoiText: {
      fontSize: 12,
      color: textSecondary,
      fontStyle: "italic",
    },
  });
};

export default globalStyles;

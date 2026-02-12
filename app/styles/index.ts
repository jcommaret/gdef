import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import type { Theme } from "@react-navigation/native";

// Constantes de couleurs pour uniformiser les styles
const COLORS = {
  primary: "#007AFF",
  secondary: "#666",
  tertiary: "#8E8E93",
  estonien: "#d73527",
  francais: "#007AFF",
  text: "#000",
  textLight: "#8E8E93",
  border: "rgba(0, 0, 0, 0.12)",
  borderLight: "rgba(200, 200, 200, 0.5)",
  background: "#f8f9fa",
  cardBackground: "rgba(255, 255, 255, 0.94)",
  cardBackgroundLight: "rgba(255, 255, 255, 0.92)",
  searchBackground: "rgba(248, 249, 250, 0.98)",
  white: "#ffffff",
};

export interface Styles {
  text: TextStyle;
  vedetteContainer: ViewStyle;
  vedetteParticule: TextStyle;
  vedetteCatGram: TextStyle;
  vedetteType: TextStyle;
  genreExposant: TextStyle;
  blocGramContainer: ViewStyle;
  blocSemantiqueContainer: ViewStyle;
  blocSemIndication: TextStyle;
  blocSemDomaine: TextStyle;
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
  sousBlocIndication2: TextStyle;
  blocContextuelContainer: ViewStyle;
  indicationContextuelle: TextStyle;
  equivalentsFrancais: TextStyle;
  registreBlocGram: TextStyle;
  domaineBlocGram: TextStyle;
  traductionExpressionContainer: ViewStyle;
  traductionExpressionItem: ViewStyle;
  indicationSemExpr: TextStyle;
  renvoiContainer: ViewStyle;
  renvoiText: TextStyle;
  exempleItem: ViewStyle;
  exempleEstonien: TextStyle;
  exempleFrancais: TextStyle;
  exempleDomaine: TextStyle;
  expressionItem: ViewStyle;
  expressionsContainer: ViewStyle;
  expressionEstonienne: TextStyle;
  expressionFrancaise: TextStyle;
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

export const globalStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    searchContainer: {
      padding: 16,
      backgroundColor: COLORS.searchBackground,
      borderBottomWidth: 0.5,
      borderBottomColor: COLORS.border,
    },
    searchBar: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      backgroundColor: COLORS.white,
      borderRadius: 16,
      paddingHorizontal: 12,
      height: 40,
      borderWidth: 1,
      borderColor: COLORS.borderLight,
      boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
      elevation: 2,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      height: 40,
      fontSize: 16,
      color: COLORS.text,
    },
    clearButton: {
      padding: 4,
    },
    listContent: {
      paddingBottom: 16,
    },
    itemText: {
      backgroundColor: COLORS.cardBackgroundLight,
      padding: 20,
      marginHorizontal: 12,
      marginVertical: 3,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: COLORS.borderLight,
      boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
      elevation: 2,
    },
    vedetteContainer: {
      marginBottom: 16,
      padding: 16,
      backgroundColor: COLORS.cardBackground,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.borderLight,
      boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
      elevation: 4,
    },
    blocGramContainer: {
      backgroundColor: COLORS.cardBackground,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.borderLight,
      boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
      elevation: 4,
    },
    blocSemantiqueContainer: {
      paddingTop: 20,
      paddingBottom: 8,
    },
    text: {
      fontSize: 14,
      marginBottom: 4,
      color: isDarkMode ? COLORS.white : COLORS.text,
      marginRight: 5,
    },
    footerContainer: {
      flexDirection: "row",
      padding: 16,
      backgroundColor: COLORS.background,
    },
    vedetteParticule: {
      color: COLORS.secondary,
    },
    vedetteCatGram: {
      fontSize: 12,
      color: COLORS.secondary,
      fontStyle: "italic",
    },
    vedetteType: {
      fontSize: 14,
      color: COLORS.secondary,
    },
    genreExposant: {
      fontSize: 10,
      fontStyle: "italic",
      marginLeft: 4,
      color: COLORS.secondary,
      lineHeight: 10,
      textAlignVertical: "top",
    },
    blocSemIndication: {
      color: COLORS.text,
      fontWeight: "500",
    },
    blocSemDomaine: {
      fontSize: 12,
      color: COLORS.secondary,
    },
    exempleItem: {
      paddingVertical: 8,
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      borderColor: COLORS.border,
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
      borderColor: COLORS.border,
      paddingVertical: 8,
    },
    expressionsContainer: {
      backgroundColor: COLORS.cardBackground,
      padding: 12,
      borderRadius: 16,
      marginTop: 8,
      borderWidth: 1,
      borderColor: COLORS.borderLight,
      boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
      elevation: 4,
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
    },
    itemCatGram: {
      fontSize: 12,
      color: COLORS.secondary,
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
      color: COLORS.text,
      fontWeight: "bold",
    },
    loadingContainer: {
      padding: 20,
      alignItems: "center",
    },
    loadingText: {
      marginTop: 8,
      color: COLORS.textLight,
    },
    loadingFullScreen: {
      flex: 1,
      backgroundColor: COLORS.background,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingFullScreenText: {
      marginTop: 10,
      fontSize: 16,
      color: COLORS.textLight,
    },
    mainContainer: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    searchIconWeb: {
      marginRight: 8,
      color: COLORS.textLight,
      fontSize: 16,
    },
    clearIconWeb: {
      color: COLORS.textLight,
      fontSize: 16,
    },
    // Styles pour DetailMot
    blocMorphContainer: {
      marginTop: 8,
    },
    sousBlocSemantiqueContainer: {
      marginBottom: 8,
    },
    sousBlocIndication2: {
      fontStyle: "italic",
      marginBottom: 4,
      fontWeight: "500",
    },
    blocContextuelContainer: {
      marginBottom: 6,
    },
    indicationContextuelle: {
      fontStyle: "italic",
      fontSize: 14,
      color: COLORS.secondary,
      marginBottom: 3,
    },
    equivalentsFrancais: {
      color: COLORS.primary,
      fontSize: 16,
      fontWeight: "bold",
    },
    registreBlocGram: {
      fontSize: 12,
      color: COLORS.secondary,
      fontStyle: "italic",
      marginBottom: 4,
    },
    domaineBlocGram: {
      fontSize: 12,
      color: COLORS.secondary,
      fontStyle: "italic",
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
      color: COLORS.secondary,
      fontStyle: "italic",
    },
    renvoiContainer: {
      marginLeft: 8,
    },
    renvoiText: {
      fontSize: 12,
      color: COLORS.secondary,
      fontStyle: "italic",
    },
  });

export default globalStyles;

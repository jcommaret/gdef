import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import type { Theme } from "@react-navigation/native";

export interface Styles {
  text: TextStyle;
  vedetteContainer: ViewStyle;
  blocGramContainer: ViewStyle;
  blocSemantiqueContainer: ViewStyle;
  itemText: TextStyle;
  searchContainer: ViewStyle;
  searchBar: ViewStyle;
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
}

export const createNavigationTheme = (isDarkMode: boolean): Theme => ({
  dark: isDarkMode,
  colors: {
    primary: "#ff7000",
    background: isDarkMode ? "#000000" : "#ffffff",
    card: isDarkMode ? "#1a1a1a" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#000000",
    border: isDarkMode ? "#333333" : "#cccccc",
    notification: "#ff7000",
  },
});


export const globalStyles = (isDarkMode: boolean) => StyleSheet.create({
  searchContainer: {
    padding: 16,
    backgroundColor: 'rgba(248, 249, 250, 0.98)',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  searchBar: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(200, 200, 200, 0.6)',
    boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
    elevation: 2,
  },
  itemText: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: 20,
    marginHorizontal: 12,
    marginVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(200, 200, 200, 0.5)',
    boxShadow: '0px 2px 6px rgba(0,0,0,0.08)',
    elevation: 2,
  },
  vedetteContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(200, 200, 200, 0.5)',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.12)',
    elevation: 4,
  },
  blocGramContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(200, 200, 200, 0.5)',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.12)',
    elevation: 4,
  },
  blocSemantiqueContainer: {
    paddingTop: 20,
    paddingBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
    color: isDarkMode ? '#fff' : '#000',
    marginRight: 5,
  },
  footerContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  vedetteParticule: {
    color: '#666',
  },
  vedetteCatGram: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  vedetteType: {
    fontSize: 14,
    color: '#666',
  },
  blocSemIndication: {
    color: '#444',
  },
  blocSemDomaine: {
    fontSize: 12,
    color: '#666',
  },
  exempleItem: {
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.12)',
  },
  exempleEstonien: {
    color: '#d73527',
  },
  exempleFrancais: {
    color: '#0066cc',
  },
  exempleDomaine: {
    fontSize: 11,
    color: '#999',
  },
  expressionItem: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    paddingVertical: 8,
  },
  expressionsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    padding: 12,
    borderRadius: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(200, 200, 200, 0.5)',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.12)',
    elevation: 4,
  },
  expressionEstonienne: {
    color: '#d73527',
  },
  expressionFrancaise: {
    color: '#0066cc',
  },
  // Styles pour l'index (liste des mots)
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemLeftColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    paddingRight: 12,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemMotText: {
    fontSize: 16,
  },
  itemCatGram: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginLeft: 8,
  },
  itemEquivalents: {
    marginTop: 2,
    fontSize: 13,
    color: '#007AFF',
  },
  itemInfoButton: {
    fontSize: 13,
    color: '000',
    fontWeight: 'bold',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#8E8E93',
  },
  loadingFullScreen: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingFullScreenText: {
    marginTop: 10,
    fontSize: 16,
    color: '#8E8E93',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchIconWeb: {
    marginRight: 8,
    color: '#8E8E93',
    fontSize: 16,
  },
  clearIconWeb: {
    color: '#8E8E93',
    fontSize: 16,
  },
  // Styles pour DetailMot
  blocMorphContainer: {
    marginTop: 8,
  },
  sousBlocSemantiqueContainer: {
    marginLeft: 16,
    marginBottom: 8,
  },
  sousBlocIndication2: {
    fontStyle: 'italic',
    marginBottom: 4,
    fontWeight: '500',
  },
  blocContextuelContainer: {
    marginLeft: 16,
    marginBottom: 6,
    borderLeftWidth: 2,
    borderLeftColor: '#E0E0E0',
    paddingLeft: 8,
  },
  indicationContextuelle: {
    fontStyle: 'italic',
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  equivalentsFrancais: {
    color: '#007AFF',
    fontSize: 16,
    paddingLeft: 8,
  },
  registreBlocGram: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  domaineBlocGram: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  traductionExpressionContainer: {
    marginLeft: 8,
  },
  traductionExpressionItem: {
    marginBottom: 4,
  },
  indicationSemExpr: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  renvoiContainer: {
    marginLeft: 8,
  },
  renvoiText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default globalStyles;
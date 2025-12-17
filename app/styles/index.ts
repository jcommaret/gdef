import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import type { Theme } from "@react-navigation/native";

export interface Styles {
  container: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  text: TextStyle;
  vedetteContainer: ViewStyle;
  blocGramContainer: ViewStyle;
  blocSemantiqueContainer: ViewStyle;
  itemText: TextStyle;
  searchContainer: ViewStyle;
  searchBar: ViewStyle;
  footerContainer:ViewStyle;
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
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  clearButton: {
    padding: 4,
  },
  listContent: {
    paddingBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
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
  content: {
    flex: 1,
    width: '100%',
    padding: 16,
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
  // Styles pour DetailMot
  backButton: {
    marginBottom: 16,
    padding: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
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
  equivalentsSection: {
    marginBottom: 8,
  },
  sensSection: {
    // Pas de style particulier, utilise le container par défaut
  },
  blocSemNumero: {
    fontWeight: 'bold',
    color: '#444',
  },
  blocSemIndication: {
    
    color: '#444',
  },
  blocSemDomaine: {
    fontSize: 12,
    color: '#666',
  },
  blocSemRegistre: {
    fontSize: 12,
    color: '#666',
  },
  sousBlocContainer: {
    marginTop: 8,
  },
  sousBlocItem: {
    marginBottom: 8,
  },
  sousBlocIndication: {
    color: '#555',
    marginBottom: 4,
  },
  equivalentItem: {
    
  },
  equivalentEstonien: {
    color: '#666',
  },
  equivalentContextuelle: {
    fontSize: 11,
    color: '#888',
  },
  equivalentExplication: {
    fontSize: 11,
    color: '#888',
  },
  exemplesContainer: {
    marginTop: 8,
  },
  exemplesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: isDarkMode ? '#fff' : '#000',
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
});

export default globalStyles;
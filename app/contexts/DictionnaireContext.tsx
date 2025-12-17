import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import dictionnaire from '../data/dictionnaire.json';

// Interface Vedette étendue pour inclure les propriétés supplémentaires
interface Vedette extends VedetteType {
  'registre-vedette'?: string;
  'domaine-vedette'?: string;
  [key: string]: any; // Pour les propriétés dynamiques
}

// Interface pour les blocs grammaticaux
interface BlocGram {
  'cat-gram'?: string;
  'registre-bloc-gram'?: string;
  'domaine-bloc-gram'?: string;
  'blocs-semantiques'?: any[];
  [key: string]: any; // Pour les propriétés dynamiques
}

// Interface Article complète
interface Article {
  id: string;
  vedette: Vedette;
  'bloc-gram'?: BlocGram;
  [key: string]: any; // Pour les propriétés dynamiques supplémentaires
}

interface DictionnaireContextType {
  articles: Article[];
  articlesById: Map<string, Article>;
  articlesByMot: Map<string, Article>;
  isReady: boolean;
}

const DictionnaireContext = createContext<DictionnaireContextType | undefined>(undefined);

export { DictionnaireContext };

export default function DictionnaireProvider({ children }: { children: ReactNode }) {
  const contextValue = useMemo(() => {
    const articles: Article[] = (dictionnaire as any).articles || [];
    
    // Créer des index pour recherches rapides O(1)
    const articlesById = new Map<string, Article>();
    const articlesByMot = new Map<string, Article>();
    
    articles.forEach((article) => {
      if (article.id) {
        articlesById.set(article.id, article);
      }
      if (article.vedette?.mot) {
        // Si plusieurs articles ont le même mot, garder le premier trouvé
        if (!articlesByMot.has(article.vedette.mot)) {
          articlesByMot.set(article.vedette.mot, article);
        }
      }
    });
    
    return {
      articles,
      articlesById,
      articlesByMot,
      isReady: true,
    };
  }, []);

  return (
    <DictionnaireContext.Provider value={contextValue}>
      {children}
    </DictionnaireContext.Provider>
  );
}

export function useDictionnaire() {
  const context = useContext(DictionnaireContext);
  if (!context) {
    throw new Error('useDictionnaire must be used within DictionnaireProvider');
  }
  return context;
}




# GDEF — Grand dictionnaire estonien-français (application mobile)

Application mobile et web du **GDEF** (_Grand dictionnaire estonien-français_), développée avec [Expo](https://expo.dev) et [React Native](https://reactnative.dev). Elle permet de consulter les articles du dictionnaire est→fra hors ligne, avec une présentation typographique alignée sur la [version en ligne](https://www.estfra.ee/gdef/).

## Fonctionnalités

- **Liste alphabétique** des vedettes estoniennes avec aperçu des équivalents français (incluant les formes irrégulières)
- **Numéros d'homonymes** affichés dans la liste et dans le détail
- **Recherche** trilingue :
  - par mot estonien (correspondance partielle, insensible aux accents : `oigus` → `õigus`)
  - par équivalent français (`beau` → `ilus`, `kaunis`…)
- **Fiche article détaillée** : vedette, morphologie, blocs grammaticaux, sens, contextes, exemples bilingues, expressions phraséologiques
- **Formatage typographique** des balises `[sup]` et `[i]` dans les textes
- Disponible sur **iOS**, **Android** et **web**

## Prérequis

- [Node.js](https://nodejs.org/) 18+ (LTS recommandé)
- npm
- Pour iOS : Xcode et simulateur (ou appareil physique avec Expo Go)
- Pour Android : Android Studio / émulateur (ou Expo Go)
- Pour régénérer les données : **Python 3**

## Installation

```bash
git clone <url-du-repo>
cd GDEF
npm install
```

### Données du dictionnaire

L'application charge `app/data/dictionnaire.json` (~30 Mo). Ce fichier est produit à partir des sources XML du GDEF :

| Fichier                            | Rôle                                       |
| ---------------------------------- | ------------------------------------------ |
| `app/data/GDEF_psv-2023-03-30.xml` | Articles estoniens (PSV)                   |
| `app/data/GDEF_fra-2023-11-08.xml` | Articles français (résolution des renvois) |
| `app/data/dictionnaire.json`       | Base JSON utilisée par l'app               |

Si `dictionnaire.json` est absent ou doit être régénéré :

```bash
python3 app/data/generation_dictionnaire.py
```

Les schémas et la description de la structure JSON se trouvent dans `app/data/README_structure.md` et `app/data/schema_article_complet.json`.

## Lancement

```bash
npm run start
```

Puis, dans le terminal Expo :

| Touche | Action                     |
| ------ | -------------------------- |
| `i`    | Ouvrir le simulateur iOS   |
| `a`    | Ouvrir l'émulateur Android |
| `w`    | Ouvrir la version web      |
| `r`    | Recharger l'application    |

Autres scripts :

```bash
npm run ios      # expo start --ios
npm run android  # expo start --android
npm run web      # expo start --web
npm run lint     # ESLint
```

Vous pouvez aussi scanner le QR code avec **Expo Go** sur un téléphone.

### Simulateur iOS

Si Expo tente d'ouvrir un simulateur supprimé ou obsolète :

```bash
xcrun simctl list devices available
npx expo start --ios --device "iPhone 12 mini"
```

En cas de cache simulateur invalide : `rm -rf ~/.expo` puis relancez.

## Structure du projet

```
GDEF/
├── app/
│   ├── index.tsx                      # Écran d'accueil (liste)
│   ├── _layout.tsx                    # Navigation (Expo Router)
│   ├── screens/
│   │   ├── index.tsx                  # Liste alphabétique et recherche
│   │   └── DetailMot.tsx              # Fiche article (orchestration)
│   ├── _components/
│   │   ├── BlocSemantique.tsx         # Rendu d'un bloc sémantique
│   │   ├── ExpressionsPhraseo.tsx     # Rendu des expressions phraséologiques
│   │   ├── FormattedText.tsx          # Texte avec balises [sup] / [i]
│   │   └── LigneEquivalents.tsx       # Ligne d'équivalents (flex-row)
│   ├── _types/
│   │   └── dictionary.ts             # Interfaces TypeScript
│   ├── _utils/
│   │   └── blocsGram.ts              # Fonctions utilitaires (blocs, équivalents…)
│   ├── contexts/
│   │   └── DictionnaireContext.tsx   # Chargement et index du dictionnaire
│   ├── styles/
│   │   └── index.ts                  # Styles partagés (globalStyles, Styles)
│   └── data/
│       ├── dictionnaire.json         # Base JSON (~30 Mo)
│       ├── GDEF_psv-2023-03-30.xml   # Source estonienne
│       ├── GDEF_fra-2023-11-08.xml   # Source française
│       ├── generation_dictionnaire.py
│       ├── schema_article_complet.json
│       └── README_structure.md
├── assets/
├── app.json
└── package.json
```

> Les dossiers préfixés `_` sous `app/` ne sont **pas** des routes Expo Router.
> Chaque fichier dispose d'un `export default` pour satisfaire le vérificateur de routes d'Expo.

## Modèle de données (aperçu)

Chaque **article** estonien contient :

- **vedette** : `mot`, `particule`, `hm` (homonymie), `bloc-morph`, registre/domaine
- **bloc-gram** ou **blocs-gram** : catégorie grammaticale et blocs sémantiques
  - **blocs-semantiques** : sens principal, sous-sens, contextes, équivalents français
  - **exemples** : exemples bilingues avec `blocs-traduction-exe` (liste, plusieurs traductions possibles)
- **blocs-phraseologiques** : expressions estoniennes et leurs traductions françaises

Les **équivalents français** embarquent l'article français résolu (`article-francais`), incluant le genre, les formes irrégulières de pluriel et de féminin.

Voir `app/data/schema_article_complet.json` pour la hiérarchie complète avec cardinalités.

### Points particuliers du format JSON

| Situation | Traitement |
|---|---|
| Un exemple avec plusieurs traductions | `blocs-traduction-exe` est une **liste** |
| Mots composés (`type: lcompose`) | Formes morphologiques abrégées avec `+` (affichées telles quelles) |
| Plusieurs domaines sur un bloc sémantique | Joints par `, ` dans `domaine-bloc-semantique` |
| Balises `[sup]...[/sup]` et `[i]...[/i]` | Interprétées à l'affichage par `FormattedText` |
| Balises annotation `[premier]`, `[deux]`… | Silencieusement supprimées à l'affichage |

## Conventions d'affichage

L'interface suit les conventions de la version en ligne du GDEF :

| Élément | Présentation |
|---|---|
| Plusieurs blocs grammaticaux | Chiffres romains : **I konj.**, **II adv.** |
| Plusieurs blocs sémantiques | Numérotation arabe : **1.**, **2.** |
| Numéro d'homonyme (`hm`) | Gras, collé à la vedette : `aas **2**` |
| Indication sémantique 2 | Entre parenthèses, _italique_ |
| Indication contextuelle | Entre crochets, romain |
| Équivalent français | Bleu, gras |
| Genre grammatical (`genre-nbr`) | Gris, petit, exposant, collé au mot : `équipe`*f* |
| Formes irrégulières | Après chaque forme : `beau, beaux (pl.), belle (f.)` |
| Rection estonienne | Rouge (même couleur que les exemples) |
| Rection française | Bleu, non gras |
| Domaine / registre | Petites capitales grises (style `domainRegistre`) |
| Indicateur de locution (`◦`) | Devant les traductions phraséologiques françaises |
| Indicateur de proverbe (`◊`) | Devant les exemples ou traductions proverbiaux |
| Exemples estoniens | Rouge |
| Traductions françaises | Bleu |
| Domaine d'un exemple | Entre parenthèses sur la même ligne : `sideeriline aasta (astr.)` |
| `[sup]e[/sup]` | Exposant : XIXᵉ siècle, 200 m² |
| `[i]titre[/i]` | Italique : *Kalevipoeg*, *Le Seigneur des anneaux* |

## Recherche

La recherche opère sur un index pré-calculé au chargement :

- **Mot estonien** : correspondance par inclusion (`includes`), insensible aux accents (`õ→o`, `ä→a`, `ö→o`, `ü→u`, `š→s`, `ž→z`)
- **Équivalents français** : correspondance par début de mot (`startsWith`) sur tous les équivalents français de l'article

L'index est calculé une fois dans un `useMemo` sur `sortedArticles`. La logique d'extraction des équivalents est centralisée dans `getEquivalentsWithContext()` (`_utils/blocsGram.ts`).

## Stack technique

- **Expo SDK 54** — React Native 0.81, React 19
- **Expo Router 6** — navigation fichier
- **TypeScript**
- Données : JSON dérivé du XML GDEF (namespace `http://www.estfra.ee/~gdef/xmlschema`)

## Documentation complémentaire

- `app/data/README_structure.md` — structure JSON des articles
- `app/data/schema_article_complet.json` — schéma avec cardinalités

## Crédits

Voir l'écran **Crédits** dans l'application (lien en bas de la liste) ou [estfra.ee/auteurs.php](https://www.estfra.ee/auteurs.php).

Dictionnaire **GDEF** — éditeur en chef : Antoine Chalvin (INALCO).  
Données : © Association franco-estonienne de lexicographie et Institut de la langue estonienne.  
Développement mobile : Jérôme Commaret.

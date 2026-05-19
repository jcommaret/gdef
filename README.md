# GDEF — Grand dictionnaire estonien-français (application mobile)

Application mobile et web du **GDEF** (_Grand dictionnaire estonien-français_), développée avec [Expo](https://expo.dev) et [React Native](https://reactnative.dev). Elle permet de consulter les articles du dictionnaire est→fra hors ligne, avec une présentation typographique alignée sur la [version en ligne](https://www.estfra.ee/gdef/).

## Fonctionnalités

- **Liste alphabétique** des vedettes estoniennes avec aperçu des équivalents français
- **Recherche** par mot estonien
- **Fiche article détaillée** : vedette, morphologie, blocs grammaticaux, sens, contextes, exemples bilingues, expressions phraséologiques
- **Résolution des renvois** vers les articles français référencés dans les équivalents
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

L’application charge `app/data/dictionnaire.json` (~28 Mo). Ce fichier est produit à partir des sources XML du GDEF :

| Fichier                            | Rôle                                       |
| ---------------------------------- | ------------------------------------------ |
| `app/data/GDEF_psv-2023-03-30.xml` | Articles estoniens (PSV)                   |
| `app/data/GDEF_fra-2023-11-08.xml` | Articles français (résolution des renvois) |
| `app/data/dictionnaire.json`       | Base JSON utilisée par l’app               |

Si `dictionnaire.json` est absent, générez-le :

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
| `a`    | Ouvrir l’émulateur Android |
| `w`    | Ouvrir la version web      |
| `r`    | Recharger l’application    |

Autres scripts :

```bash
npm run ios      # expo start --ios
npm run android  # expo start --android
npm run web      # expo start --web
npm run lint     # ESLint
```

Vous pouvez aussi scanner le QR code avec **Expo Go** sur un téléphone.

### Simulateur iOS

Si Expo tente d’ouvrir un simulateur supprimé ou obsolète, listez les appareils disponibles puis ciblez-en un explicitement :

```bash
xcrun simctl list devices available
npx expo start --ios --device "iPhone 12 mini"
```

En cas de cache simulateur invalide : `rm -rf ~/.expo` puis relancez.

## Structure du projet

```
GDEF/
├── app/
│   ├── index.tsx                 # Écran d’accueil (liste)
│   ├── _layout.tsx               # Navigation (Expo Router)
│   ├── screens/
│   │   ├── index.tsx             # Liste et recherche
│   │   └── DetailMot.tsx         # Fiche article
│   ├── _components/              # Composants (hors routes Expo Router)
│   │   └── LigneEquivalents.tsx
│   ├── _types/                   # Types TypeScript
│   ├── _utils/                   # Utilitaires (numérotation, blocs grammaticaux)
│   ├── contexts/                 # Contexte React (chargement du dictionnaire)
│   ├── styles/                   # Styles partagés
│   └── data/                     # JSON, XML, script Python, schémas
├── assets/                       # Icônes, splash screens
├── app.json                      # Configuration Expo
└── package.json
```

Les dossiers préfixés par `_` sous `app/` (`_components`, `_types`, `_utils`) ne sont **pas** des routes Expo Router : ils évitent les avertissements du type _« missing default export »_.

## Modèle de données (aperçu)

Chaque **article** estonien contient notamment :

- **vedette** : mot, particule, homonymie (`hm`), morphologie, registre…
- **bloc-gram** ou **blocs-gram** : catégorie grammaticale et blocs sémantiques
- **blocs-semantiques** : sens principaux, sous-sens, contextes, équivalents français
- **blocs-phraseologiques** : expressions et traductions

Voir `app/data/README_structure.md` pour la hiérarchie complète.

## Conventions d’affichage

L’interface reprend les conventions de la version en ligne :

| Élément                      | Présentation                                                       |
| ---------------------------- | ------------------------------------------------------------------ |
| Plusieurs blocs grammaticaux | Chiffres romains + catégorie : **I konj.**, **II adv.**            |
| Plusieurs blocs sémantiques  | Numérotation arabe : **1.**, **2.** (un seul bloc : pas de numéro) |
| Indication sémantique 2      | Entre parenthèses, _italique_ : `(täielikult)`                     |
| Indication contextuelle      | Entre crochets, romain : `[selga, jalga]`                          |
| Équivalent français          | Bleu, gras                                                         |
| Explication (`explication`)  | _Italique_, noir                                                   |
| Texte estonien (exemples)    | Rouge                                                              |
| Genre après équivalent       | Gris, petit : `(m)`, `(f)`                                         |

Indications et équivalents sont sur **la même ligne**, sans saut de ligne entre eux.

## Stack technique

- **Expo SDK 54** — React Native 0.81, React 19
- **Expo Router 6** — navigation fichier
- **TypeScript**
- Données : JSON dérivé du XML GDEF (namespace `http://www.estfra.ee/~gdef/xmlschema`)

## Documentation complémentaire

- `app/data/README_structure.md` — structure JSON des articles
- `app/data/README_DetailMot_v2.md` — historique des champs affichés dans la fiche article
- `app/data/schema_article_complet.json` — schéma avec cardinalités

## Crédits et licence des données

Dictionnaire **GDEF** — _Grand dictionnaire estonien-français_.  
Données : © Association franco-estonienne de lexicographie et Institut de la langue estonienne. [estfra.ee/gdef](https://www.estfra.ee/gdef/)).

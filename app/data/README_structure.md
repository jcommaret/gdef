# Structure de l'Article de Dictionnaire

## Transformation de la structure hiérarchique en JSON

Ce document explique la transformation de la structure indentée du fichier `exemple.json` en schéma JSON structuré.

## Fichiers créés

### 1. `schema_article.json`
Schéma JSON basique montrant la structure générale des données.

### 2. `schema_article_complet.json`
Schéma JSON détaillé avec métadonnées de cardinalité :
- `0..1` : Optionnel (peut être absent)
- `1` : Obligatoire (toujours présent)
- `0..n` : Liste (peut être vide ou contenir plusieurs éléments)
- `1..n` : Liste non vide (au moins un élément)

### 3. `exemple_article.json`
Exemple concret d'un article avec des données réelles du mot "ajama".

### 4. `article.ts`
Interfaces TypeScript pour typage strict de la structure.

## Hiérarchie principale

```
article
├── vedette (obligatoire)
│   ├── mot (obligatoire)
│   ├── variante, type, particule, hm (optionnels)
│   ├── bloc-morph (optionnel)
│   └── registre/domaine-vedette (optionnels)
├── bloc-gram (obligatoire)
│   ├── cat-gram, registre/domaine-bloc-gram (optionnels)
│   └── blocs-semantiques[] (liste)
│       ├── indication-semantique-1 (optionnel)
│       ├── sous-blocs-semantiques[] (liste)
│       │   ├── indication-semantique-2 (optionnel)
│       │   └── blocs-contextuels[] (liste)
│       │       ├── indication-contextuel (optionnel)
│       │       └── blocs-equivalents[] (liste)
│       └── blocs-exemples[] (liste)
└── blocs-phraseologiques[] (liste optionnelle)
```

## Éléments avec cardinalité multiple (listes)

Les éléments suivants peuvent apparaître **0, 1 ou n fois** :

### Au niveau sémantique
- `blocs-semantiques[]`
- `sous-blocs-semantiques[]`
- `blocs-contextuels[]`
- `blocs-equivalents[]`
- `blocs-exemples[]`
- `exemples[]`

### Au niveau phraséologique
- `blocs-phraseologiques[]`
- `blocs-traduction-expr[]`
- `blocs-renvois[]`

## Correspondance avec le dictionnaire actuel

Cette structure correspond aux données déjà extraites dans `dictionnaire_combine.json` :

| Structure originale | Dictionnaire actuel |
|-------------------|-------------------|
| `indication-semantique-1` | `indication_semantique` |
| `indication-semantique-2` | `indication_semantique` |
| `indication-contextuel` | `indication_contextuelle` |
| `blocs-contextuels` | `blocs_contextuels` |
| `blocs-equivalents` | `equivalents` |
| `mot-princ` | `mot_princ_id` + `article_francais` |

## Usage

Ces schémas peuvent être utilisés pour :
1. **Validation** des données extraites
2. **Documentation** de la structure
3. **Typage TypeScript** dans l'application
4. **Génération** automatique d'interfaces
5. **Migration** vers d'autres formats de données

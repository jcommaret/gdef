# Modifications apportées pour afficher le genre-nbr

## Date: $(date +%Y-%m-%d)

## Fichiers modifiés

### 1. `app/data/generation_dictionnaire.py`
**Ajouts:**
- Nouvelle fonction `extract_grammaire()` (lignes 34-46) qui extrait toutes les informations grammaticales des articles français
- Modification de la fonction `extract_vedette()` pour inclure l'extraction de la section grammaire

**Résultat:** Les articles français dans le JSON contiennent maintenant:
```json
{
  "vedette": {
    "mot": "adresse",
    "grammaire": {
      "cat-gram": "s.",
      "genre-nbr": "f",
      "pluriel-irr": "",
      "feminin-irr": "",
      "conjugaison": "",
      "aux-etre": "false"
    }
  }
}
```

### 2. `app/screens/DetailMot.tsx`
**Modifications:**
- Ligne 256-289: Ajout du genre-nbr dans l'affichage des équivalents français du bloc contextuel
- Ligne 173-213: Ajout du genre-nbr dans l'affichage des équivalents français généraux en haut de page

**Résultat:** Les mots français s'affichent maintenant comme:
- `adresse (f)`
- `trésor (m)`
- `prairie (f)`

### 3. `app/screens/index.tsx`
**Modifications:**
- Ligne 110-145: Fonction `getEquivalents()` modifiée pour inclure le genre-nbr dans la liste des mots

**Résultat:** Les équivalents dans la liste principale affichent aussi le genre-nbr

## Valeurs possibles pour genre-nbr

- `m` : masculin
- `f` : féminin
- `mf` : masculin/féminin
- `minv` : masculin invariable
- `finv` : féminin invariable
- `mpl` : masculin pluriel
- `fpl` : féminin pluriel
- `adjm` : adjectif masculin
- `adjf` : adjectif féminin
- `""` (vide) : pas de genre/nombre (verbes, adverbes, etc.)

## Statistiques

- **72 489** articles français indexés avec leurs informations grammaticales
- **5 013** articles estoniens
- **13 992** références françaises résolues

## Pour tester

1. Lancer l'application: `npm start`
2. Rechercher un mot estonien
3. Observer les équivalents français qui affichent maintenant le genre entre parenthèses

## Exemple

Mot estonien: **aasta**
Équivalents affichés:
- an (m)
- année (f)

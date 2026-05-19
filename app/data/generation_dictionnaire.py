#!/usr/bin/env python3
"""
Script amélioré pour transformer le fichier PSV en JSON selon la structure formalisée
Conforme au schéma défini dans schema_article_complet.json
"""

import xml.etree.ElementTree as ET
import json
import sys
import os

def extract_text_safely(element):
    """Extrait le texte d'un élément de manière sécurisée."""
    return element.text.strip() if element is not None and element.text else None

def get_tag_name(element):
    """Extrait le nom du tag sans le namespace."""
    return element.tag.split('}')[-1] if '}' in element.tag else element.tag

def extract_bloc_morph(bloc_morph_elem):
    """Extrait les données morphologiques selon le schéma."""
    if bloc_morph_elem is None:
        return None
    
    morph_data = {}
    for child in bloc_morph_elem:
        tag = get_tag_name(child)
        text = extract_text_safely(child)
        if text:
            morph_data[tag] = text
    
    return morph_data if morph_data else None

def extract_grammaire(grammaire_elem):
    """Extrait les données grammaticales (cat-gram, genre-nbr, etc.)."""
    if grammaire_elem is None:
        return None
    
    gram_data = {}
    for child in grammaire_elem:
        tag = get_tag_name(child)
        text = extract_text_safely(child)
        # Inclure même les valeurs vides pour préserver la structure
        gram_data[tag] = text if text is not None else ''
    
    return gram_data if gram_data else None

def extract_vedette(vedette_elem):
    """Extrait la vedette selon le schéma formalisé."""
    if vedette_elem is None:
        return None
    
    vedette_data = {}
    
    for child in vedette_elem:
        tag = get_tag_name(child)
        text = extract_text_safely(child)
        
        if tag == 'bloc-morph':
            morph_data = extract_bloc_morph(child)
            if morph_data:
                vedette_data['bloc-morph'] = morph_data
        elif tag == 'grammaire':
            gram_data = extract_grammaire(child)
            if gram_data:
                vedette_data['grammaire'] = gram_data
        elif text:
            vedette_data[tag] = text
    
    return vedette_data if vedette_data else None

def extract_rection_equiv(bloc_equiv_elem):
    """Extrait les données de rection selon le schéma."""
    rection_elem = bloc_equiv_elem.find('.//{http://www.estfra.ee/~gdef/xmlschema}rection-equiv')
    if rection_elem is None:
        return None
    
    rection_data = {}
    for child in rection_elem:
        tag = get_tag_name(child)
        text = extract_text_safely(child)
        if text:
            rection_data[tag] = text
    
    return rection_data if rection_data else None

def extract_bloc_equivalent(bloc_equiv_elem, french_index):
    """Extrait un bloc équivalent selon le schéma."""
    equiv_data = {}
    resolved = False
    
    for child in bloc_equiv_elem:
        tag = get_tag_name(child)
        text = extract_text_safely(child)
        
        if tag == 'rection-equiv':
            rection_data = extract_rection_equiv(bloc_equiv_elem)
            if rection_data:
                equiv_data['rection-equiv'] = rection_data
        elif text:
            if tag == 'mot-princ':
                equiv_data['mot-princ'] = text
                # Résoudre la référence française
                if text in french_index:
                    equiv_data['article-francais'] = french_index[text]
                    resolved = True
                else:
                    equiv_data['mot-princ-non-resolu'] = text
            else:
                equiv_data[tag] = text
    
    return equiv_data if equiv_data else None, resolved

def extract_bloc_contextuel(bloc_contextuel_elem, french_index):
    """Extrait un bloc contextuel selon le schéma."""
    bloc_data = {}
    resolved_count = 0
    
    # Indication contextuelle
    indication_elem = bloc_contextuel_elem.find('.//{http://www.estfra.ee/~gdef/xmlschema}indication-cont')
    if indication_elem is not None:
        indication_text = extract_text_safely(indication_elem)
        if indication_text:
            bloc_data['indication-contextuel'] = indication_text
    
    # Blocs équivalents
    blocs_equivalents = []
    for bloc_equiv_elem in bloc_contextuel_elem.findall('.//{http://www.estfra.ee/~gdef/xmlschema}bloc-equivalent'):
        equiv_data, resolved = extract_bloc_equivalent(bloc_equiv_elem, french_index)
        if equiv_data:
            blocs_equivalents.append(equiv_data)
            if resolved:
                resolved_count += 1
    
    if blocs_equivalents:
        bloc_data['blocs-equivalents'] = blocs_equivalents
    
    return bloc_data if bloc_data else None, resolved_count

def extract_bloc_traduction_exe(bloc_trad_elem):
    """Extrait un bloc de traduction d'exemple selon le schéma."""
    if bloc_trad_elem is None:
        return None
    
    trad_data = {}
    for child in bloc_trad_elem:
        tag = get_tag_name(child)
        text = extract_text_safely(child)
        if text:
            trad_data[tag] = text
    
    return trad_data if trad_data else None

def extract_exemple(exemple_elem):
    """Extrait un exemple selon le schéma."""
    exemple_data = {}
    
    for child in exemple_elem:
        tag = get_tag_name(child)
        
        if tag == 'bloc-traduction-exe':
            trad_data = extract_bloc_traduction_exe(child)
            if trad_data:
                exemple_data['bloc-traduction-exe'] = trad_data
        else:
            text = extract_text_safely(child)
            if text:
                exemple_data[tag] = text
    
    return exemple_data if exemple_data else None

def extract_sous_bloc_semantique(sous_bloc_elem, french_index):
    """Extrait un sous-bloc sémantique selon le schéma."""
    sous_bloc_data = {}
    resolved_count = 0
    
    # Indication sémantique niveau 2
    indication2_elem = sous_bloc_elem.find('.//{http://www.estfra.ee/~gdef/xmlschema}indication-sem2')
    if indication2_elem is not None:
        indication2_text = extract_text_safely(indication2_elem)
        if indication2_text:
            sous_bloc_data['indication-semantique-2'] = indication2_text
    
    # Blocs contextuels
    blocs_contextuels = []
    for bloc_contextuel_elem in sous_bloc_elem.findall('.//{http://www.estfra.ee/~gdef/xmlschema}bloc-contextuel'):
        bloc_data, resolved = extract_bloc_contextuel(bloc_contextuel_elem, french_index)
        if bloc_data:
            blocs_contextuels.append(bloc_data)
            resolved_count += resolved
    
    if blocs_contextuels:
        sous_bloc_data['blocs-contextuels'] = blocs_contextuels
    
    return sous_bloc_data if sous_bloc_data else None, resolved_count

def extract_bloc_semantique(bloc_sem_elem, french_index):
    """Extrait un bloc sémantique selon le schéma."""
    bloc_data = {}
    resolved_count = 0
    
    # Indication sémantique niveau 1
    indication_elem = bloc_sem_elem.find('.//{http://www.estfra.ee/~gdef/xmlschema}indication-sem1')
    if indication_elem is not None:
        indication_text = extract_text_safely(indication_elem)
        if indication_text:
            bloc_data['indication-semantique-1'] = indication_text
    
    # Registre et domaine
    registre_elem = bloc_sem_elem.find('.//{http://www.estfra.ee/~gdef/xmlschema}registre-sens-ved')
    if registre_elem is not None:
        registre_text = extract_text_safely(registre_elem)
        if registre_text:
            bloc_data['registre-sens-ved'] = registre_text
    
    domaine_elem = bloc_sem_elem.find('.//{http://www.estfra.ee/~gdef/xmlschema}domaine-bloc-semantique')
    if domaine_elem is not None:
        domaine_text = extract_text_safely(domaine_elem)
        if domaine_text:
            bloc_data['domaine-bloc-semantique'] = domaine_text
    
    # Sous-blocs sémantiques
    sous_blocs_semantiques = []
    for sous_bloc_elem in bloc_sem_elem.findall('.//{http://www.estfra.ee/~gdef/xmlschema}sous-bloc-semantique'):
        sous_bloc_data, resolved = extract_sous_bloc_semantique(sous_bloc_elem, french_index)
        if sous_bloc_data:
            sous_blocs_semantiques.append(sous_bloc_data)
            resolved_count += resolved
    
    if sous_blocs_semantiques:
        bloc_data['sous-blocs-semantiques'] = sous_blocs_semantiques
    
    # Exemples
    exemples = []
    for exemple_elem in bloc_sem_elem.findall('.//{http://www.estfra.ee/~gdef/xmlschema}exemple'):
        exemple_data = extract_exemple(exemple_elem)
        if exemple_data:
            exemples.append(exemple_data)
    
    if exemples:
        bloc_data['exemples'] = exemples
    
    return bloc_data if bloc_data else None, resolved_count

def extract_single_bloc_gram(bloc_gram_elem, french_index):
    """Extrait un bloc grammatical (cat-gram, registre, blocs sémantiques du bloc)."""
    NS = '{http://www.estfra.ee/~gdef/xmlschema}'
    bloc_gram_data = {}
    resolved_count = 0

    cat_gram_elem = bloc_gram_elem.find(f'{NS}cat-gram')
    if cat_gram_elem is not None:
        cat_text = extract_text_safely(cat_gram_elem)
        if cat_text:
            bloc_gram_data['cat-gram'] = cat_text

    registre_elem = bloc_gram_elem.find(f'{NS}registre-bloc-gram')
    if registre_elem is not None:
        registre_text = extract_text_safely(registre_elem)
        if registre_text:
            bloc_gram_data['registre-bloc-gram'] = registre_text

    domaine_elem = bloc_gram_elem.find(f'{NS}domaine-bloc-gram')
    if domaine_elem is not None:
        domaine_text = extract_text_safely(domaine_elem)
        if domaine_text:
            bloc_gram_data['domaine-bloc-gram'] = domaine_text

    blocs_semantiques = []
    for bloc_sem_elem in bloc_gram_elem.findall(f'{NS}bloc-semantique'):
        bloc_data, resolved = extract_bloc_semantique(bloc_sem_elem, french_index)
        if bloc_data:
            blocs_semantiques.append(bloc_data)
            resolved_count += resolved

    if blocs_semantiques:
        bloc_gram_data['blocs-semantiques'] = blocs_semantiques

    return bloc_gram_data if bloc_gram_data else None, resolved_count


def extract_blocs_gram(article_elem, french_index):
    """Extrait tous les blocs grammaticaux d'un article (un ou plusieurs)."""
    NS = '{http://www.estfra.ee/~gdef/xmlschema}'
    blocs_gram = []
    resolved_total = 0

    for bloc_gram_elem in article_elem.findall(f'{NS}bloc-gram'):
        bloc_data, resolved = extract_single_bloc_gram(bloc_gram_elem, french_index)
        if bloc_data:
            blocs_gram.append(bloc_data)
            resolved_total += resolved

    return blocs_gram, resolved_total

def extract_rection_trad(bloc_trad_elem):
    """Extrait les données de rection de traduction."""
    rection_elem = bloc_trad_elem.find('.//{http://www.estfra.ee/~gdef/xmlschema}rection-trad')
    if rection_elem is None:
        return None
    
    rection_data = {}
    for child in rection_elem:
        tag = get_tag_name(child)
        text = extract_text_safely(child)
        if text:
            rection_data[tag] = text
    
    return rection_data if rection_data else None

def extract_bloc_traduction_expr(bloc_trad_elem):
    """Extrait un bloc de traduction d'expression."""
    trad_data = {}
    
    for child in bloc_trad_elem:
        tag = get_tag_name(child)
        
        if tag == 'rection-trad':
            rection_data = extract_rection_trad(bloc_trad_elem)
            if rection_data:
                trad_data['rection-trad'] = rection_data
        else:
            text = extract_text_safely(child)
            if text:
                trad_data[tag] = text
    
    return trad_data if trad_data else None

def extract_bloc_phraseologique(unite_elem):
    """Extrait un bloc phraséologique selon le schéma."""
    bloc_data = {}
    
    # Expression estonienne
    expr_est_elem = unite_elem.find('.//{http://www.estfra.ee/~gdef/xmlschema}expression-est')
    if expr_est_elem is not None:
        expr_est_text = extract_text_safely(expr_est_elem)
        if expr_est_text:
            bloc_data['expression-est'] = expr_est_text
    
    # Registre de l'expression
    registre_elem = unite_elem.find('.//{http://www.estfra.ee/~gdef/xmlschema}registre-expression-est')
    if registre_elem is not None:
        registre_text = extract_text_safely(registre_elem)
        if registre_text:
            bloc_data['registre-expression-est'] = registre_text
    
    # Blocs de traduction d'expression
    blocs_traduction_expr = []
    for bloc_trad_elem in unite_elem.findall('.//{http://www.estfra.ee/~gdef/xmlschema}bloc-traduction-expr'):
        trad_data = extract_bloc_traduction_expr(bloc_trad_elem)
        if trad_data:
            blocs_traduction_expr.append(trad_data)
    
    if blocs_traduction_expr:
        bloc_data['blocs-traduction-expr'] = blocs_traduction_expr
    
    # Blocs renvois
    blocs_renvois = []
    for renvoi_elem in unite_elem.findall('.//{http://www.estfra.ee/~gdef/xmlschema}renvoi-phraseol'):
        renvoi_text = extract_text_safely(renvoi_elem)
        if renvoi_text:
            blocs_renvois.append({'renvoi-phraseol': renvoi_text})
    
    if blocs_renvois:
        bloc_data['blocs-renvois'] = blocs_renvois
    
    return bloc_data if bloc_data else None

def extract_french_articles(xml_file_path):
    """Extrait les articles français et crée un index par ID."""
    print(f"📖 Extraction des articles français depuis {xml_file_path}...")
    
    articles_index = {}
    
    try:
        tree = ET.parse(xml_file_path)
        root = tree.getroot()
        
        count = 0
        for article_elem in root.iter():
            if article_elem.tag.endswith('article'):
                article_id = article_elem.get('{http://www.estfra.ee/~gdef/xmlschema}id')
                if article_id:
                    # Extraire les informations de base
                    article_data = {'id': article_id}
                    
                    # Vedette française
                    vedette_elem = article_elem.find('.//{http://www.estfra.ee/~gdef/xmlschema}vedette')
                    vedette_data = extract_vedette(vedette_elem)
                    if vedette_data:
                        article_data['vedette'] = vedette_data
                    
                    articles_index[article_id] = article_data
                    count += 1
                    
                    if count % 10000 == 0:
                        print(f"   Articles français traités: {count}")
        
        print(f"✅ {count} articles français indexés")
        return articles_index
    
    except Exception as e:
        print(f"❌ Erreur extraction français: {e}")
        return {}

def extract_estonian_articles(xml_file_path, french_index):
    """Extrait les articles estoniens selon la structure formalisée."""
    print(f"📖 Extraction des articles estoniens depuis {xml_file_path}...")
    
    articles = []
    resolved_references = 0
    
    try:
        tree = ET.parse(xml_file_path)
        root = tree.getroot()
        
        count = 0
        for article_elem in root.iter():
            if article_elem.tag.endswith('article'):
                article_data = {}
                
                # ID de l'article
                article_id = article_elem.get('{http://www.estfra.ee/~gdef/xmlschema}id')
                if article_id:
                    article_data['id'] = article_id
                
                # Vedette estonienne
                vedette_elem = article_elem.find('.//{http://www.estfra.ee/~gdef/xmlschema}vedette')
                vedette_data = extract_vedette(vedette_elem)
                if vedette_data:
                    article_data['vedette'] = vedette_data
                
                # Fréquence
                freq_elem = article_elem.find('.//{http://www.estfra.ee/~gdef/xmlschema}frequence')
                if freq_elem is not None:
                    freq_text = extract_text_safely(freq_elem)
                    if freq_text:
                        article_data['frequence'] = freq_text
                
                # Bloc(s) grammatical(aux) avec blocs sémantiques
                blocs_gram, resolved = extract_blocs_gram(article_elem, french_index)
                if blocs_gram:
                    if len(blocs_gram) == 1:
                        article_data['bloc-gram'] = blocs_gram[0]
                    else:
                        article_data['blocs-gram'] = blocs_gram
                    resolved_references += resolved
                
                # Blocs phraséologiques
                blocs_phraseologiques = []
                for unite_elem in article_elem.findall('.//{http://www.estfra.ee/~gdef/xmlschema}unite-phraseol'):
                    bloc_data = extract_bloc_phraseologique(unite_elem)
                    if bloc_data:
                        blocs_phraseologiques.append(bloc_data)
                
                if blocs_phraseologiques:
                    article_data['blocs-phraseologiques'] = blocs_phraseologiques
                
                if article_data:
                    articles.append(article_data)
                    count += 1
                    
                    if count % 1000 == 0:
                        print(f"   Articles estoniens traités: {count}")
        
        print(f"✅ {count} articles estoniens extraits")
        print(f"✅ {resolved_references} références françaises résolues")
        return articles
    
    except Exception as e:
        print(f"❌ Erreur extraction estonien: {e}")
        return []

def main():
    """Fonction principale."""
    print("🚀 TRANSFORMATION PSV → JSON AVEC STRUCTURE FORMALISÉE")
    print("=" * 60)
    
    # Chemins des fichiers
    fichier_francais = 'app/data/GDEF_fra-2023-11-08.xml'
    fichier_psv = 'app/data/GDEF_psv-2023-03-30.xml'
    fichier_sortie = 'app/data/dictionnaire.json'
    
    try:
        # 1. Extraire et indexer les articles français
        french_index = extract_french_articles(fichier_francais)
        if not french_index:
            print("❌ Impossible de charger les articles français")
            return 1
        
        # 2. Extraire les articles estoniens avec la nouvelle structure
        estonian_articles = extract_estonian_articles(fichier_psv, french_index)
        if not estonian_articles:
            print("❌ Impossible de charger les articles estoniens")
            return 1
        
        # 3. Créer la structure finale conforme au schéma
        dictionnaire = {
            'metadata': {
                'version': '2.0',
                'schema': 'schema_article_complet.json',
                'source_files': ['GDEF_psv-2023-03-30.xml', 'GDEF_fra-2023-11-08.xml'],
                'description': 'Dictionnaire estonien-français avec structure formalisée',
                'extraction_date': '2024-01-01'
            },
            'articles': estonian_articles
        }
        
        # 4. Sauvegarder en JSON
        print(f"\n💾 Sauvegarde vers {fichier_sortie}...")
        with open(fichier_sortie, 'w', encoding='utf-8') as f:
            json.dump(dictionnaire, f, ensure_ascii=False, indent=2)
        
        # 5. Statistiques
        file_size = os.path.getsize(fichier_sortie)
        print(f"✅ Dictionnaire sauvegardé avec succès!")
        print(f"📁 Fichier: {fichier_sortie}")
        print(f"📊 Taille: {file_size / 1024 / 1024:.1f} MB")
        print(f"📈 Articles: {len(estonian_articles)}")
        
        return 0
    
    except Exception as e:
        print(f"❌ Erreur fatale: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == "__main__":
    sys.exit(main())

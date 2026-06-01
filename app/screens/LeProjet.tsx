import React from "react";
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from "react-native";

const logos: { source: ImageSourcePropType; label: string }[] = [
  { source: require("../../assets/logos/logo_oif.jpg"),     label: "Organisation Internationale de la Francophonie" },
  { source: require("../../assets/logos/logo_hm.jpg"),      label: "Ministère estonien de l'Éducation" },
  { source: require("../../assets/logos/logo_kulmin.jpg"),  label: "Ministère estonien de la Culture" },
  { source: require("../../assets/logos/logo_cccf.jpg"),    label: "Centre Culturel Français en Estonie" },
  { source: require("../../assets/logos/logo_ambass.jpg"),  label: "Ambassade de France en Estonie" },
  { source: require("../../assets/logos/logo_schuman.jpg"), label: "Fondation Robert Schuman" },
  { source: require("../../assets/logos/logo_wbi.png"),     label: "Wallonie-Bruxelles International" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function LeProjet() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Grand dictionnaire estonien-français</Text>
      <Text style={styles.subtitle}>GDEF</Text>

      <Section title="Présentation">
        <Text style={styles.para}>
          Le Grand dictionnaire estonien-français est réalisé par l'Association
          franco-estonienne de lexicographie (EPLÜ). Il s'adresse aux
          locuteurs estoniens ayant besoin d'équivalents français et aux
          francophones lisant des textes estoniens — traducteurs, étudiants
          estoniens apprenant le français, étudiants francophones apprenant
          l'estonien.
        </Text>
        <Text style={styles.para}>
          L'ouvrage est conçu comme un dictionnaire de traduction : il ne
          définit pas les mots estoniens, mais fournit leurs équivalents
          français authentiques en prêtant attention aux nuances sémantiques.
          Chaque article est rédigé conjointement par des linguistes estoniens
          et français ayant une expérience de la traduction.
        </Text>
        <Text style={styles.para}>
          Le dictionnaire est prévu pour comporter plus de cent mille articles,
          couvrant le vocabulaire général et les terminologies spécialisées
          pertinentes depuis l'adhésion de l'Estonie à l'Union européenne
          en 2004.
        </Text>
        <Text style={styles.para}>
          L'assurance qualité repose sur le croisement de plusieurs sources :
          la base de données de l'Institut de la langue estonienne, la base
          morphologique française Morphalou, et un corpus bilingue substantiel.
          La plateforme Jibiki permet la collaboration à distance et la mise
          en ligne immédiate des articles finalisés. Le financement public
          garantit la gratuité de l'accès aux résultats.
        </Text>
      </Section>

      <Section title="Soutiens institutionnels">
        <View style={styles.logosGrid}>
          {logos.map(({ source, label }) => (
            <View key={label} style={styles.logoItem}>
              <Image
                source={source}
                style={styles.logoImage}
                resizeMode="contain"
                accessibilityLabel={label}
              />
              <Text style={styles.logoLabel}>{label}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Publications">
        <Text style={styles.ref}>
          Chalvin A. &amp; Mangeot M. (2006). Actes du congrès{" "}
          <Text style={styles.italic}>Euralex XII</Text>, Turin.
        </Text>
        <Text style={styles.ref}>
          Chalvin A., Mangeot M., Ramdani E. &amp; Jürviste M. Annuaire de
          l'Association estonienne de linguistique appliquée.
        </Text>
        <Text style={styles.ref}>
          Jürviste M. &amp; Ollivry J. P. (2006).{" "}
          <Text style={styles.italic}>Forseliuse Sõnumid 13</Text>, Tartu.
        </Text>
        <Text style={styles.ref}>
          Mangeot M. &amp; Chalvin A. (2006). Conférence{" "}
          <Text style={styles.italic}>LREC</Text>, Gênes.
        </Text>
      </Section>

      <View style={styles.footer}>
        <Text style={styles.footerText}>estfra.ee/gdef</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 28,
    fontStyle: "italic",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#007AFF",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#007AFF",
    paddingBottom: 4,
  },
  para: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
    marginBottom: 12,
  },
  item: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
    marginBottom: 4,
  },
  logosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  logoItem: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#f5f5f7",
    borderRadius: 8,
  },
  logoImage: {
    width: "100%",
    height: 48,
  },
  logoLabel: {
    fontSize: 10,
    color: "#555",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 14,
  },
  ref: {
    fontSize: 13,
    color: "#444",
    lineHeight: 20,
    marginBottom: 10,
  },
  italic: {
    fontStyle: "italic",
  },
  footer: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
  },
  footerText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
});

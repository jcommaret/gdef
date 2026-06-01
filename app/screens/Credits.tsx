import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Person({ name, role }: { name: string; role?: string }) {
  return (
    <View style={styles.person}>
      <Text style={styles.personName}>{name}</Text>
      {role && <Text style={styles.personRole}>{role}</Text>}
    </View>
  );
}

export default function Credits() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Grand dictionnaire estonien-français</Text>
      <Text style={styles.subtitle}>
        Réalisé par l'Association franco-estonienne de lexicographie (Tartu)
      </Text>

      <Section title="Directeur scientifique">
        <Person
          name="Antoine Chalvin"
          role="professeur des universités à l'INALCO (estonien, finnois)"
        />
      </Section>

      <Section title="Collaborateurs">
        <Person
          name="Madis Jürviste"
          role="traducteur et interprète, diplômé de l'université de Tartu (master de linguistique estonienne et finno-ougrienne)"
        />
        <Person
          name="Ülo Siirak"
          role="lecteur de français à l'Université de Tallinn, traducteur"
        />
        <Person
          name="Vincent Dautancourt"
          role="lecteur de français à l'Université de Tartu"
        />
        <Person
          name="Liina Altvee-Perroy"
          role="diplômée de l'université de Tartu (études françaises) et de l'université de Tallinn (master d'interprétation)"
        />
        <Person
          name="Martin Carayol"
          role="professeur de lettres, docteur de l'INALCO (études estoniennes et finnoises)"
        />
        <Person
          name="Jean Pascal Ollivry"
          role="traducteur et interprète, diplômé de l'INALCO (estonien)"
        />
        <Person
          name="Heete Sahkai"
          role="chercheuse à l'Institut de la langue estonienne (Tallinn)"
        />
        <Person
          name="Eva Toulouze"
          role="professeur des universités à l'INALCO (langues finno-ougriennes)"
        />
        <Text style={styles.collaborateurs}>
          {[
            "Caroline Abner", "Maria Aksjonova", "Maria Alanurme", "Marri Amon",
            "Iika Arnek", "Hedvy Arula", "Yvonne Bailly", "Amélie Barthélémy",
            "Chantal de Bourmont", "Irma Castro", "Hélène Challulau", "Anne Chamard",
            "Maria Einman", "Inge Eller", "Cédric Farez", "Alexandre Glais",
            "Michel Gruselle", "Maria Hansar", "Ulvika Hurt", "Maris Jõela",
            "Viivian Jõemets", "Katrina Kalda", "Kadri Kaldmäe", "Indrek Koff",
            "Viktor Korrovits", "Karmen Kutser", "Madli Kütt", "Elina Laanes",
            "Suzanne Lesage", "Madli Lippur", "Jean-Pierre Minaudier", "Kateryn Mänd",
            "Jean Nagy", "Liisa Pall", "Laurent Planche", "Ann Puusepp",
            "Kadri Põlluveer", "Reilika Raestik", "Egle Ramdani", "Rannar Riispere",
            "Marve Sauk", "Carola Schmiedberger", "Mailis Seero", "Liis Sillaste-Toots",
            "Kadriann Soosaar", "Aija Sprivul", "Maarit Stepanov", "Katre Talviste",
            "Stella Timmer", "Anu Treikelder", "Jean-Jacques Triboulet", "Thierry Vallat",
          ].join(", ")}
        </Text>
      </Section>

      <Section title="Responsable informatique">
        <Person
          name="Mathieu Mangeot"
          role="enseignant-chercheur à l'université de Chambéry"
        />
      </Section>

      <Section title="Développement mobile">
        <Person 
          name="Jérôme Commaret"
          role="professeur de développement à L'Efrei, développeur, diplômé d'Hetic (2010)" />
      </Section>

      <Section title="Conversion des données">
        <Text style={styles.collaborateurs}>Kristjan Ruumet, Egle Ramdani</Text>
      </Section>

      <Section title="Partenariat scientifique">
        <Person name="Institut de la langue estonienne (Tallinn)" />
      </Section>

      <Section title="Remerciements à">
        <Person name="Margit Langemets" />
        <Person name="Ülle Viks" />
      </Section>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © Association franco-estonienne de lexicographie
          {"\n"}Institut de la langue estonienne
          {"\n"}estfra.ee/gdef
        </Text>
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
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 28,
    fontStyle: "italic",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#007AFF",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#007AFF",
    paddingBottom: 4,
  },
  person: {
    marginBottom: 8,
  },
  personName: {
    fontSize: 15,
    fontWeight: "600",
  },
  personRole: {
    fontSize: 13,
    color: "#555",
    marginTop: 1,
  },
  collaborateurs: {
    fontSize: 13,
    color: "#444",
    lineHeight: 22,
    marginTop: 8,
  },
  footer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
  },
  footerText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    lineHeight: 20,
  },
});

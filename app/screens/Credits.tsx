import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AppBackground } from "@/components/AppBackground";
import { semanticColors } from "@/styles";
import { useStackScrollPaddingTop } from "@/utils/navigation";
import { useIsDarkMode } from "@/utils/useIsDarkMode";

type CreditsStyles = ReturnType<typeof createCreditsStyles>;

function Section({
  title,
  children,
  styles,
}: {
  title: string;
  children: React.ReactNode;
  styles: CreditsStyles;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Person({
  name,
  role,
  styles,
}: {
  name: string;
  role?: string;
  styles: CreditsStyles;
}) {
  return (
    <View style={styles.person}>
      <Text style={styles.personName}>{name}</Text>
      {role && <Text style={styles.personRole}>{role}</Text>}
    </View>
  );
}

function createCreditsStyles(isDark: boolean) {
  const c = semanticColors(isDark);
  return StyleSheet.create({
    scroll: {
      flex: 1,
      backgroundColor: "transparent",
    },
    container: {
      padding: 20,
      paddingBottom: 40,
      flexGrow: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 6,
      color: c.textPrimary,
    },
    subtitle: {
      fontSize: 13,
      color: c.textSecondary,
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
      color: c.textPrimary,
    },
    personRole: {
      fontSize: 13,
      color: c.textMuted,
      marginTop: 1,
    },
    collaborateurs: {
      fontSize: 13,
      color: c.textBody,
      lineHeight: 22,
      marginTop: 8,
    },
    footer: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: c.borderHairline,
    },
    footerText: {
      fontSize: 12,
      color: c.textFooter,
      textAlign: "center",
      lineHeight: 20,
    },
  });
}

export default function Credits() {
  const scrollPaddingTop = useStackScrollPaddingTop();
  const isDark = useIsDarkMode();
  const styles = useMemo(() => createCreditsStyles(isDark), [isDark]);

  return (
    <AppBackground>
    <ScrollView
      style={styles.scroll}
      contentInsetAdjustmentBehavior="never"
      contentContainerStyle={[styles.container, { paddingTop: scrollPaddingTop }]}
    >
      <Text style={styles.title}>Grand dictionnaire estonien-français</Text>
      <Text style={styles.subtitle}>
        Réalisé par l'Association franco-estonienne de lexicographie (Tartu)
      </Text>

      <Section title="Directeur scientifique" styles={styles}>
        <Person
          styles={styles}
          name="Antoine Chalvin"
          role="professeur des universités à l'INALCO (estonien, finnois)"
        />
      </Section>

      <Section title="Collaborateurs" styles={styles}>
        <Person
          styles={styles}
          name="Madis Jürviste"
          role="traducteur et interprète, diplômé de l'université de Tartu (master de linguistique estonienne et finno-ougrienne)"
        />
        <Person
          styles={styles}
          name="Ülo Siirak"
          role="lecteur de français à l'Université de Tallinn, traducteur"
        />
        <Person
          styles={styles}
          name="Vincent Dautancourt"
          role="lecteur de français à l'Université de Tartu"
        />
        <Person
          styles={styles}
          name="Liina Altvee-Perroy"
          role="diplômée de l'université de Tartu (études françaises) et de l'université de Tallinn (master d'interprétation)"
        />
        <Person
          styles={styles}
          name="Martin Carayol"
          role="professeur de lettres, docteur de l'INALCO (études estoniennes et finnoises)"
        />
        <Person
          styles={styles}
          name="Jean Pascal Ollivry"
          role="traducteur et interprète, diplômé de l'INALCO (estonien)"
        />
        <Person
          styles={styles}
          name="Heete Sahkai"
          role="chercheuse à l'Institut de la langue estonienne (Tallinn)"
        />
        <Person
          styles={styles}
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

      <Section title="Responsable informatique" styles={styles}>
        <Person
          styles={styles}
          name="Mathieu Mangeot"
          role="enseignant-chercheur à l'université de Chambéry"
        />
      </Section>

      <Section title="Développement mobile" styles={styles}>
        <Person
          styles={styles}
          name="Jérôme Commaret"
          role="professeur de développement à L'Efrei, développeur, diplômé d'Hetic (2010)" />
      </Section>

      <Section title="Conversion des données" styles={styles}>
        <Text style={styles.collaborateurs}>Kristjan Ruumet, Egle Ramdani</Text>
      </Section>

      <Section title="Partenariat scientifique" styles={styles}>
        <Person styles={styles} name="Institut de la langue estonienne (Tallinn)" />
      </Section>

      <Section title="Remerciements à" styles={styles}>
        <Person styles={styles} name="Margit Langemets" />
        <Person styles={styles} name="Ülle Viks" />
      </Section>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © Association franco-estonienne de lexicographie
          {"\n"}Institut de la langue estonienne
          {"\n"}estfra.ee/gdef
        </Text>
      </View>
    </ScrollView>
    </AppBackground>
  );
}

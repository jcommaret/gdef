import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AppBackground } from "@/components/AppBackground";
import { semanticColors } from "@/styles";
import { useStackScrollPaddingTop } from "@/utils/navigation";
import { useIsDarkMode } from "@/utils/useIsDarkMode";

function createContactStyles(isDark: boolean) {
  const c = semanticColors(isDark);
  return StyleSheet.create({
    scroll: {
      flex: 1,
      backgroundColor: "transparent",
    },
    container: {
      padding: 20,
      paddingBottom: 40,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 20,
      color: c.textPrimary,
    },
    intro: {
      fontSize: 14,
      color: c.textBody,
      lineHeight: 22,
      marginBottom: 20,
    },
    card: {
      backgroundColor: c.cardSurface,
      borderRadius: 12,
      padding: 16,
      gap: 4,
      borderWidth: isDark ? 1 : 0,
      borderColor: isDark ? "rgba(255,255,255,0.16)" : "transparent",
    },
    orgName: {
      fontSize: 15,
      fontWeight: "600",
      marginBottom: 8,
      color: c.textPrimary,
    },
    line: {
      fontSize: 14,
      color: c.textBody,
      lineHeight: 22,
    },
    url: {
      color: c.accentBlue,
      marginTop: 8,
    },
  });
}

export default function Contact() {
  const scrollPaddingTop = useStackScrollPaddingTop();
  const isDark = useIsDarkMode();
  const styles = useMemo(() => createContactStyles(isDark), [isDark]);

  return (
    <AppBackground>
      <ScrollView
        style={styles.scroll}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={[
          styles.container,
          { paddingTop: scrollPaddingTop },
        ]}
      >
        <Text style={styles.title}>Contact</Text>

        <Text style={styles.intro}>
          Pour toute remarque, correction ou proposition de participation à
          l'élaboration du dictionnaire :
        </Text>

        <View style={styles.card}>
          <Text style={styles.orgName}>
            Association franco-estonienne de lexicographie
          </Text>
          <Text style={styles.line}>Lossi 3-404</Text>
          <Text style={styles.line}>51003 Tartu, Estonie</Text>
        </View>
      </ScrollView>
    </AppBackground>
  );
}

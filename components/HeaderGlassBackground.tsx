import { BlurView } from "expo-blur";
import React from "react";
import { Platform, StyleSheet, View, type ViewStyle } from "react-native";

import { GLASS } from "@/styles/glass";

/** Fond d’en-tête verre (sous le titre « Détail du mot », etc.). */
export function HeaderGlassBackground() {
  if (Platform.OS === "ios") {
    return null;
  }

  if (Platform.OS === "web") {
    return <View style={styles.web} />;
  }

  return (
    <BlurView intensity={72} tint="light" style={StyleSheet.absoluteFill} />
  );
}

const styles = StyleSheet.create({
  web: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: GLASS.fillWeb,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: GLASS.borderSubtle,
    backdropFilter: "blur(20px) saturate(1.35)",
    WebkitBackdropFilter: "blur(20px) saturate(1.35)",
  } as ViewStyle,
});

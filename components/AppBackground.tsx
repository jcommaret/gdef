import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { APP_BACKGROUND } from "@/styles/glass";
import { useIsDarkMode } from "@/utils/useIsDarkMode";

/** Fond dégradé pour l’effet liquid glass (clair / sombre). */
export function AppBackground({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const isDark = useIsDarkMode();
  const palette = isDark ? APP_BACKGROUND.dark : APP_BACKGROUND.light;

  return (
    <View style={[styles.root, style]}>
      <LinearGradient
        colors={[...palette.base]}
        locations={[0, 0.32, 0.68, 1]}
        start={{ x: 0.05, y: 0 }}
        end={{ x: 0.95, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={[...palette.overlay]}
        locations={[0, 0.5, 1]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[StyleSheet.absoluteFill, styles.noPointer]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  noPointer: {
    pointerEvents: "none",
  },
});

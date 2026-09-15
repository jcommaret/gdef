import { BlurView } from "expo-blur";
import React, { useMemo } from "react";
import { Platform, StyleSheet, View, type ViewStyle } from "react-native";

import { getGlass } from "@/styles/glass";
import { useIsDarkMode } from "@/utils/useIsDarkMode";

/** Fond d’en-tête verre (clair / sombre). */
export function HeaderGlassBackground() {
  const isDark = useIsDarkMode();
  const glass = getGlass(isDark);
  const blurTint = isDark ? "dark" : "light";

  const dynamic = useMemo(
    () =>
      StyleSheet.create({
        web: {
          ...StyleSheet.absoluteFill,
          backgroundColor: glass.fillWeb,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: glass.borderSubtle,
          backdropFilter: "blur(20px) saturate(1.35)",
          WebkitBackdropFilter: "blur(20px) saturate(1.35)",
        } as ViewStyle,
        shine: {
          ...StyleSheet.absoluteFill,
          backgroundColor: glass.headerShine,
          pointerEvents: "none",
        },
      }),
    [glass],
  );

  if (Platform.OS === "web") {
    return <View style={dynamic.web} />;
  }

  return (
    <View
      style={[
        styles.shell,
        { borderBottomColor: glass.borderSubtle },
      ]}
    >
      <BlurView intensity={80} tint={blurTint} style={StyleSheet.absoluteFill} />
      <View style={dynamic.shine} />
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    ...StyleSheet.absoluteFill,
    overflow: "hidden",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

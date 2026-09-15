import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

/** Fond dégradé doux pour l’effet liquid glass. */
export function AppBackground({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.root, style]}>
      <LinearGradient
        colors={["#d8e4f5", "#e6dcf3", "#cce4f8", "#eef2f9"]}
        locations={[0, 0.32, 0.68, 1]}
        start={{ x: 0.05, y: 0 }}
        end={{ x: 0.95, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["rgba(255,255,255,0.35)", "transparent", "rgba(180,210,255,0.2)"]}
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

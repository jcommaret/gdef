import { BlurView } from "expo-blur";
import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  ViewStyle,
  type StyleProp,
} from "react-native";

import { GLASS } from "@/styles/glass";

type GlassSurfaceProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  /** Intensité du flou (iOS / Android). */
  intensity?: number;
  borderRadius?: number;
};

/** Panneau verre dépoli (liquid glass). */
export function GlassSurface({
  children,
  style,
  contentStyle,
  intensity = 72,
  borderRadius = 16,
}: GlassSurfaceProps) {
  const shellStyle = [
    styles.shell,
    { borderRadius, borderColor: GLASS.border },
    style,
  ];

  if (Platform.OS === "web") {
    return (
      <View style={[shellStyle, styles.webGlass]}>
        <View style={[styles.content, contentStyle]}>{children}</View>
      </View>
    );
  }

  return (
    <View style={shellStyle}>
      <BlurView
        intensity={intensity}
        tint="light"
        style={[StyleSheet.absoluteFill, { borderRadius }]}
      />
      <View style={[styles.shine, { borderRadius }]} />
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    overflow: "hidden",
    borderWidth: 1,
    backgroundColor: GLASS.fill,
    ...Platform.select({
      ios: {
        shadowColor: GLASS.shadowColor,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.14,
        shadowRadius: 20,
      },
      android: { elevation: 4 },
      default: {
        boxShadow: "0 8px 28px rgba(70, 90, 130, 0.14)",
      },
    }),
  },
  webGlass: {
    backgroundColor: GLASS.fillWeb,
    backdropFilter: "blur(20px) saturate(1.4)",
    WebkitBackdropFilter: "blur(20px) saturate(1.4)",
  } as ViewStyle,
  shine: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.45)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    pointerEvents: "none",
  },
  content: {
    position: "relative",
  },
});

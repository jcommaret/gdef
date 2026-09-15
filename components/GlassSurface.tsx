import { BlurView } from "expo-blur";
import React, { useMemo } from "react";
import {
  Platform,
  StyleSheet,
  View,
  ViewStyle,
  type StyleProp,
} from "react-native";

import { getGlass } from "@/styles/glass";
import { useIsDarkMode } from "@/utils/useIsDarkMode";

type GlassSurfaceProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  intensity?: number;
  borderRadius?: number;
  /** Sans contour. */
  borderless?: boolean;
  /** Capsule liquid glass (footer, chips). */
  pill?: boolean;
};

/** Panneau verre dépoli (liquid glass). */
export function GlassSurface({
  children,
  style,
  contentStyle,
  intensity = 72,
  borderRadius = 16,
  borderless = false,
  pill = false,
}: GlassSurfaceProps) {
  const isDark = useIsDarkMode();
  const glass = getGlass(isDark);
  const blurTint = isDark ? "dark" : "light";
  const radius = pill ? 999 : borderRadius;

  const dynamic = useMemo(
    () =>
      StyleSheet.create({
        shell: {
          overflow: "hidden",
          borderWidth: borderless ? 0 : 1,
          backgroundColor: glass.fill,
          borderColor: pill ? glass.borderSubtle : glass.border,
          ...Platform.select({
            ios: {
              shadowColor: glass.shadowColor,
              shadowOffset: { width: 0, height: pill ? 4 : 8 },
              shadowOpacity: isDark ? (pill ? 0.28 : 0.35) : pill ? 0.1 : 0.14,
              shadowRadius: pill ? 12 : 20,
            },
            android: { elevation: 4 },
            default: {
              boxShadow: isDark
                ? "0 8px 28px rgba(0, 0, 0, 0.45)"
                : "0 8px 28px rgba(70, 90, 130, 0.14)",
            },
          }),
        },
        webGlass: {
          backgroundColor: glass.fillWeb,
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        } as ViewStyle,
        shine: {
          ...StyleSheet.absoluteFill,
          borderWidth: borderless ? 0 : 1,
          borderColor: glass.shineBorder,
          backgroundColor: glass.shineFill,
          pointerEvents: "none",
        },
      }),
    [borderless, glass, isDark, pill],
  );

  const shellStyle = [dynamic.shell, { borderRadius: radius }, style];

  if (Platform.OS === "web") {
    return (
      <View style={[shellStyle, dynamic.webGlass]}>
        <View style={[styles.content, contentStyle]}>{children}</View>
      </View>
    );
  }

  return (
    <View style={shellStyle}>
      <BlurView
        intensity={intensity}
        tint={blurTint}
        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
      />
      <View style={[dynamic.shine, { borderRadius: radius }]} />
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    position: "relative",
  },
});

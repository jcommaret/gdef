/** Tokens liquid glass — clair et sombre. */
export type GlassTokens = {
  fill: string;
  fillWeb: string;
  fillMuted: string;
  border: string;
  borderSubtle: string;
  shadowColor: string;
  listItemFill: string;
  shineBorder: string;
  shineFill: string;
  headerShine: string;
};

const GLASS_LIGHT: GlassTokens = {
  fill: "rgba(255, 255, 255, 0.38)",
  fillWeb: "rgba(255, 255, 255, 0.45)",
  fillMuted: "rgba(255, 255, 255, 0.32)",
  border: "rgba(255, 255, 255, 0.58)",
  borderSubtle: "rgba(255, 255, 255, 0.42)",
  shadowColor: "#5a78a8",
  listItemFill: "rgba(255, 255, 255, 0.48)",
  shineBorder: "rgba(255, 255, 255, 0.45)",
  shineFill: "rgba(255, 255, 255, 0.08)",
  headerShine: "rgba(255, 255, 255, 0.12)",
};

const GLASS_DARK: GlassTokens = {
  fill: "rgba(36, 38, 48, 0.72)",
  fillWeb: "rgba(28, 28, 32, 0.78)",
  fillMuted: "rgba(30, 32, 40, 0.55)",
  border: "rgba(255, 255, 255, 0.16)",
  borderSubtle: "rgba(255, 255, 255, 0.1)",
  shadowColor: "#000000",
  listItemFill: "rgba(44, 46, 58, 0.78)",
  shineBorder: "rgba(255, 255, 255, 0.12)",
  shineFill: "rgba(255, 255, 255, 0.04)",
  headerShine: "rgba(255, 255, 255, 0.06)",
};

/** @deprecated préférer getGlass(isDark) */
export const GLASS = GLASS_LIGHT;

export function getGlass(isDark: boolean): GlassTokens {
  return isDark ? GLASS_DARK : GLASS_LIGHT;
}

export const APP_BACKGROUND = {
  light: {
    base: ["#d8e4f5", "#e6dcf3", "#cce4f8", "#eef2f9"] as const,
    overlay: [
      "rgba(255,255,255,0.35)",
      "transparent",
      "rgba(180,210,255,0.2)",
    ] as const,
  },
  dark: {
    base: ["#0c0f14", "#151a24", "#101620", "#0a0d12"] as const,
    overlay: [
      "rgba(80, 100, 140, 0.12)",
      "transparent",
      "rgba(20, 24, 36, 0.35)",
    ] as const,
  },
};

import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "expo-router/react-navigation";
import type { useRouter } from "expo-router";

type Router = ReturnType<typeof useRouter>;

/** Marge sous l’en-tête transparent (liquid glass). */
export const STACK_HEADER_EXTRA_PADDING = 16;

/** Hauteur approximative de la barre « Le projet · Crédits · Contact ». */
export const HOME_FOOTER_HEIGHT = 44;

export function useStackScrollPaddingTop(): number {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const minBar =
    Platform.OS === "ios" ? insets.top + 44 : insets.top + 56;
  return Math.max(headerHeight, minBar) + STACK_HEADER_EXTRA_PADDING;
}

/** Retour arrière fiable (appareil réel si la pile est vide). */
export function goBack(router: Router): void {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/");
  }
}

import { useHeaderHeight } from "@react-navigation/elements";
import type { Router } from "expo-router";

/** Marge sous l’en-tête transparent (liquid glass). */
export const STACK_HEADER_EXTRA_PADDING = 12;

export function useStackScrollPaddingTop(): number {
  return useHeaderHeight() + STACK_HEADER_EXTRA_PADDING;
}

/** Retour arrière fiable (appareil réel si la pile est vide). */
export function goBack(router: Router): void {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/");
  }
}

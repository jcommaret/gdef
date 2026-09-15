import type { Router } from "expo-router";

/** Retour arrière fiable (appareil réel si la pile est vide). */
export function goBack(router: Router): void {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/");
  }
}

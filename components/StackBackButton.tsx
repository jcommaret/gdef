import { HeaderBackButton } from "@react-navigation/elements";
import { useRouter } from "expo-router";

import { goBack } from "@/utils/navigation";

/** Bouton retour natif avec repli vers l’accueil si la pile est vide. */
export function StackBackButton() {
  const router = useRouter();

  return (
    <HeaderBackButton
      tintColor="#007AFF"
      displayMode="minimal"
      onPress={() => goBack(router)}
    />
  );
}

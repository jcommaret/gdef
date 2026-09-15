import { HeaderBackButton } from "@react-navigation/elements";
import { useRouter } from "expo-router";

import { goBack } from "../_utils/navigation";

/** Bouton retour natif avec repli vers l’accueil si la pile est vide. */
export function StackBackButton() {
  const router = useRouter();

  return (
    <HeaderBackButton
      tintColor="#007AFF"
      labelVisible={false}
      onPress={() => goBack(router)}
    />
  );
}

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import { goBack } from "@/utils/navigation";
import { useIsDarkMode } from "@/utils/useIsDarkMode";

/** Bouton retour (chevron seul, sans pastille ni bordure). */
export function StackBackButton() {
  const router = useRouter();
  const isDark = useIsDarkMode();
  const chevronColor = isDark ? "#0A84FF" : "#007AFF";

  return (
    <Pressable
      onPress={() => goBack(router)}
      accessibilityRole="button"
      accessibilityLabel="Retour"
      hitSlop={{ top: 12, bottom: 12, left: 8, right: 12 }}
      style={({ pressed }) => [styles.hitArea, pressed && styles.pressed]}
    >
      <Ionicons name="chevron-back" size={26} color={chevronColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hitArea: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 2,
  },
  pressed: {
    opacity: 0.55,
  },
});

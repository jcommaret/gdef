import { useRouter } from "expo-router";
import { useIsFocused } from "expo-router/react-navigation";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GlassSurface } from "@/components/GlassSurface";
import { globalStyles, semanticColors } from "@/styles";
import { useIsDarkMode } from "@/utils/useIsDarkMode";

/** Pillule Le projet · Crédits · Contact — uniquement sur l’écran d’accueil actif. */
export function HomeFooterNav() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const isDark = useIsDarkMode();
  const insets = useSafeAreaInsets();
  const styles = globalStyles(isDark);
  const colors = semanticColors(isDark);

  if (!isFocused) {
    return null;
  }

  return (
    <View
      style={[
        stylesFooter.anchor,
        { bottom: Math.max(insets.bottom - 10, 4) },
      ]}
    >
      <GlassSurface pill intensity={72}>
        <View style={[styles.footerContainer, { gap: 26 }]}>
          <TouchableOpacity onPress={() => router.push("/screens/LeProjet")}>
            <Text style={{ color: colors.linkMuted, fontSize: 13 }}>
              Le projet
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/screens/Credits")}>
            <Text style={{ color: colors.linkMuted, fontSize: 13 }}>
              Crédits
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/screens/Contact")}>
            <Text style={{ color: colors.linkMuted, fontSize: 13 }}>
              Contact
            </Text>
          </TouchableOpacity>
        </View>
      </GlassSurface>
    </View>
  );
}

const stylesFooter = StyleSheet.create({
  anchor: {
    position: "absolute",
    left: 16,
    right: 16,
    alignItems: "center",
  },
});

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { StackBackButton } from "./_components/StackBackButton";
import DictionnaireProvider from "./contexts/DictionnaireContext";

// Empêcher la disparition automatique du splash screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Masquer le splash screen une fois que le layout est prêt
    const hideSplashScreen = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn("Erreur lors de la suppression du splash screen:", error);
      }
    };

    // Petit délai pour s'assurer que tout est rendu
    const timer = setTimeout(hideSplashScreen, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <DictionnaireProvider>
          <Stack
            screenOptions={{
              headerBackTitle: "",
              gestureEnabled: true,
              fullScreenGestureEnabled: true,
              headerLeft: () => <StackBackButton />,
            }}
          >
            <Stack.Screen
              name="index"
              options={{ headerShown: false, title: "", headerLeft: undefined }}
            />
            <Stack.Screen
              name="screens/DetailMot"
              options={{ headerShown: true, title: "Détail du mot" }}
            />
            <Stack.Screen
              name="screens/Credits"
              options={{ headerShown: true, title: "Crédits" }}
            />
            <Stack.Screen
              name="screens/LeProjet"
              options={{ headerShown: true, title: "Le projet" }}
            />
            <Stack.Screen
              name="screens/Contact"
              options={{ headerShown: true, title: "Contact" }}
            />
          </Stack>
        </DictionnaireProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});

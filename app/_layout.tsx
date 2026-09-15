import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppBackground } from "@/components/AppBackground";
import { HeaderGlassBackground } from "@/components/HeaderGlassBackground";
import { StackBackButton } from "@/components/StackBackButton";
import DictionnaireProvider from "@/contexts/DictionnaireContext";
import { useIsDarkMode } from "@/utils/useIsDarkMode";

SplashScreen.preventAutoHideAsync();

function RootStack() {
  const isDark = useIsDarkMode();
  const headerForeground = isDark ? "#f2f2f7" : "#1c1c1e";

  const navigationTheme = useMemo(() => {
    const base = isDark ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        background: "transparent",
        card: "transparent",
      },
    };
  }, [isDark]);

  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <AppBackground>
        <Stack
          screenOptions={{
            headerBackTitle: "",
            headerBackVisible: false,
            headerBackTitleVisible: false,
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
            headerLeft: () => <StackBackButton />,
            headerLeftContainerStyle: {
              backgroundColor: "transparent",
              minWidth: 36,
              marginLeft: 0,
            },
            headerShadowVisible: false,
            headerTransparent: true,
            headerTintColor: headerForeground,
            headerTitleStyle: {
              fontWeight: "600",
              color: headerForeground,
            },
            headerStyle: { backgroundColor: "transparent" },
            headerBackground: () => <HeaderGlassBackground />,
            contentStyle: { backgroundColor: "transparent" },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              title: "",
              headerLeft: undefined,
            }}
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
      </AppBackground>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  useEffect(() => {
    const hideSplashScreen = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn("Erreur lors de la suppression du splash screen:", error);
      }
    };

    const timer = setTimeout(hideSplashScreen, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <DictionnaireProvider>
          <RootStack />
        </DictionnaireProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});

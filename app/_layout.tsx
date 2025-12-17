import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import DictionnaireProvider from './contexts/DictionnaireContext';

// Empêcher la disparition automatique du splash screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Masquer le splash screen une fois que le layout est prêt
    const hideSplashScreen = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn('Erreur lors de la suppression du splash screen:', error);
      }
    };

    // Petit délai pour s'assurer que tout est rendu
    const timer = setTimeout(hideSplashScreen, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <DictionnaireProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/DetailMot"
          options={{ headerShown: true }}
        />
      </Stack>
    </DictionnaireProvider>
  );
}

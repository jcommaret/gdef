import { useColorScheme } from "react-native";

export function useIsDarkMode(): boolean {
  return useColorScheme() === "dark";
}

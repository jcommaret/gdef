# Sõnaraamat — iOS Assets

## Structure
```
ios/
  AppIcon.appiconset/   → drag into Xcode > Assets.xcassets
    Contents.json
    Icon-*.png
  SplashScreen/
    splash@1x.png       → 375×812
    splash@2x.png       → 750×1624
    splash@3x.png       → 1242×2688
```

## Intégration React Native

### Icône
1. Ouvre Xcode > ton projet > Assets.xcassets
2. Supprime l'AppIcon existant
3. Glisse le dossier `AppIcon.appiconset` dedans

Ou avec react-native-make :
```bash
npx @bam.tech/react-native-make set-icon --path ios/AppIcon.appiconset/Icon-1024.png
```

### Splashscreen (react-native-bootsplash)
```bash
yarn add react-native-bootsplash
npx react-native generate-bootsplash ios/SplashScreen/splash@3x.png \
  --background-color=0D1B2A \
  --logo-width=200
```

Ou avec expo-splash-screen :
```bash
expo install expo-splash-screen
```
puis dans app.json :
```json
{
  "expo": {
    "splash": {
      "image": "./ios/SplashScreen/splash@3x.png",
      "resizeMode": "contain",
      "backgroundColor": "#0D1B2A"
    }
  }
}
```

export default {
  name: "allahsoft-react-native-app",
  slug: "allahsoft-react-native-app",
  version: "1.0.1",
  orientation: "portrait",
  icon: "./assets/images/allahsoft-icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/allahsoft-splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    infoPlist: {
      NSLocationAlwaysAndWhenInUseUsageDescription:
        "We need your location to show you the qibla direcion.",
      NSLocationWhenInUseUsageDescription:
        "We need your location to show you the qibla direcion.",
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/allahsoft-adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.anonymous.allahsoft",
  },
  web: {
    favicon: "./assets/images/allahsoft-favicon.png",
  },
  extra: {
    eas: {
      projectId: "f5a2a61d-bf28-4961-a1a5-7bb206749919",
    },
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
};

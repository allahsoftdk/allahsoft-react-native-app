export default {
  name: "allahsoft",
  slug: "allahsoft",
  version: "1.0.2",
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
      projectId: "70199505-e38d-4b3b-aef2-9132802773a6",
    },
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
};

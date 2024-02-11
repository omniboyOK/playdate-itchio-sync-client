import {Platform, PlatformColor} from "react-native-windows";

export const BACKGROUND_COLOR =
  Platform.OS === "windows"
    ? PlatformColor("SystemControlAcrylicWindowBrush")
    : "#FFC833";

export const ACRYLIC_COLOR =
  Platform.OS === "windows"
    ? PlatformColor("AcrylicBackgroundFillColorDefaultBrush")
    : "#FFC833";

import {Platform, PlatformColor} from "react-native-windows";

export const BACKGROUND_COLOR =
  Platform.OS === "windows"
    ? PlatformColor("AcrylicBackgroundFillColorDefaultBrush")
    : "#FFC833";

export const ACRYLIC_COLOR =
  Platform.OS === "windows"
    ? PlatformColor("SystemControlAcrylicWindowBrush")
    : "#FFC833";

export const ACRYLIC_HIGHLIGHT =
  Platform.OS === "windows"
    ? PlatformColor("AcrylicBackgroundFillColorBaseBrush")
    : "#33FFFF";

export const PLAYDATE_YELLOW = "#FFC833";

export const ITCHIO_RED = "#FF2449";

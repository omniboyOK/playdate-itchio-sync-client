import {Platform, PlatformColor} from "react-native-windows";

export const BACKGROUND_COLOR =
  Platform.OS === "windows"
    ? PlatformColor("AcrylicBackgroundFillColorDefaultBrush")
    : "#212223";

export const ACRYLIC_COLOR =
  Platform.OS === "windows"
    ? PlatformColor("SystemControlAcrylicWindowBrush")
    : "#212223";

export const ACRYLIC_HIGHLIGHT =
  Platform.OS === "windows"
    ? PlatformColor("AcrylicBackgroundFillColorBaseBrush")
    : "##707070";

export const PLAYDATE_YELLOW = "#FFC833";

export const ITCHIO_RED = "#FF2449";

export const PRIMARY_DARK = "#212223";

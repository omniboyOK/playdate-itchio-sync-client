import "react-native";
declare module "@env" {
  export const ITCHIO_LOGIN_URL: string;
}

declare module "react-native" {
  interface ViewProps {
    onMouseEnter?: (event: MouseEvent) => void;
    onMouseLeave?: (event: MouseEvent) => void;
  }
}

declare module "react-native-dom-parser";
declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

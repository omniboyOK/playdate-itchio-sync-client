import "react-native";

declare module "react-native" {
  interface ViewProps {
    onMouseEnter?: (event: MouseEvent) => void;
    onMouseLeave?: (event: MouseEvent) => void;
  }
}


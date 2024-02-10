import {ViewStyle, TextStyle} from "react-native-windows";

export interface BaseButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
}

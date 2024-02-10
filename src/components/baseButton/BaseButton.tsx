// BaseButton.tsx
import React from "react";
import {TouchableOpacity, Text, ActivityIndicator} from "react-native-windows";
import {BaseButtonProps} from "types/components";

const BaseButton: React.FC<BaseButtonProps> = ({
  onPress,
  title,
  style,
  textStyle,
  disabled = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style, disabled && {backgroundColor: "#CCCCCC"}]}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator size="small" color="#000000" />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default BaseButton;

import React from "react";
import {TextInput, View} from "react-native";

interface BaseinputTextProps {
  value: string | undefined;
  setValue: (e: string) => void;
  placeholder?: string;
}

export const BaseTextInput = ({
  value,
  setValue,
  placeholder,
}: BaseinputTextProps) => {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        height: 48,
        width: 383,
        justifyContent: "center",
        borderRadius: 6,
      }}>
      <TextInput
        style={{
          backgroundColor: "#FFFFFF",
          borderBottomWidth: 0,
          color: "#707070",
          borderRadius: 5,
          width: 383,
          fontSize: 16,
        }}
        clearButtonMode="never"
        onChangeText={e => setValue(e)}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#212223"
        editable={true}
        clearTextOnFocus={false}
      />
    </View>
  );
};

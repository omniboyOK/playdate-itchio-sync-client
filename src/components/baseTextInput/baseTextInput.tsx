import React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native-windows";

interface BaseinputTextProps {
  value: string | undefined;
  setValue: (e: string) => void;
  placeholder?: string;
  _textInputProps?: TextInputProps;
}

export const BaseTextInput = ({
  value,
  setValue,
  placeholder,
  _textInputProps,
}: BaseinputTextProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        clearButtonMode="never"
        onChangeText={setValue} // Simplified for cleaner code
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#707070"
        editable={true}
        {..._textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    maxHeight: 48,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 0,
    color: "#212223",
    borderRadius: 5,
    fontSize: 16,
    padding: 12,
  },
});

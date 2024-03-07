import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearAsyncStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
    console.log("AsyncStorage has been cleared!");
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};

export const debugLog = (text: string): void => {
  console.log("--", text.toUpperCase(), "--");
};

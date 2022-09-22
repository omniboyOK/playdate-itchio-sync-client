import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMyStringValue = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    // retrieve error
    console.log(e);
  }
};

export const setStringValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // save error
    console.log(e);
  }
};

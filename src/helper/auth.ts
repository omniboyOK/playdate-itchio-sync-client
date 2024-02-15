import {Linking} from "react-native-windows";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchCredentialsInfo} from "../api/itchio";
import {ITCHIO_LOGIN_URL} from "@env";

// Oauth Login with app token
export const signInAsync = (): void => {
  Linking.openURL(ITCHIO_LOGIN_URL);
};

export const checkToken = async (token: string): Promise<string> => {
  try {
    const response = await fetchCredentialsInfo(token);
    const {errors, user} = await response.json();

    if (errors?.length) throw new Error("Invalid Token");

    await AsyncStorage.setItem("userToken", token);

    return JSON.stringify({errors, user});
  } catch (error) {
    return "";
  }
};

// Remove token from local storage
export const asyncLogout = async (): Promise<void> => {
  try {
    const keysToRemove = ["userToken", "userName", "userProfile"];

    await AsyncStorage.multiRemove(keysToRemove);
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

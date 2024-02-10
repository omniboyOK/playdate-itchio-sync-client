import {Linking} from "react-native-windows";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchAccountInfo, fetchCredentialsInfo} from "../api/itchio";
import {
  ITCHIO_LOGIN_URL
} from "@env";

// Oauth Login with app token
export const signInAsync = (): void => {
  Linking.openURL(ITCHIO_LOGIN_URL);
};

// Check if token is valid and save it
export const checkToken = async (token: string): Promise<string> => {
  try {
    const response = await fetchCredentialsInfo(token);
    const {errors, user} = await response.json();

    if (errors?.length) throw new Error("Invalid Token");

    const fetchAccountResponse = await fetchAccountInfo(token);
    const {username, url} = await fetchAccountResponse.json();

    await AsyncStorage.setItem("userToken", token);
    await AsyncStorage.setItem("userName", username || "");
    await AsyncStorage.setItem("userProfile", url || "");

    return JSON.stringify({errors, user});
  } catch (error) {
    console.error(error);
    throw error;
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

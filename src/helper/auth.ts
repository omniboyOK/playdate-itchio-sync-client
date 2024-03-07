import {Linking} from "react-native-windows";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchCredentialsInfo} from "../api/itchio-service";
import {ITCHIO_LOGIN_URL} from "@env";

// Oauth Login with app token
export const signInAsync = (): void => {
  Linking.openURL(ITCHIO_LOGIN_URL);
};

export const signInApiAsync = (): void => {
  Linking.openURL("https://itch.io/user/settings/api-keys");
};

export const checkApiKey = async (token: string): Promise<boolean> => {
  try {
    const response = await fetchCredentialsInfo(token);
    const {errors} = await response.json();

    if (errors?.length) throw new Error("Invalid Token");

    await AsyncStorage.setItem("userToken", token);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const checkOauthToken = async (token: string): Promise<string> => {
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

export const getAuthToken = async () => {
  return await AsyncStorage.getItem("userToken");
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

import {
  ITCHIO_OAUTH_CLIENT,
  ITCHIO_OAUTH_REDIRECT,
  ITCHIO_OAUTH_SCOPE,
} from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Linking} from "react-native-windows";
import {fetchAccountInfo, fetchCredentialsInfo} from "../api/itchio";

// Oauth Login with app token
export const signInAsync = () => {
  Linking.openURL(
    `https://itch.io/user/oauth?client_id=${ITCHIO_OAUTH_CLIENT}&scope=${ITCHIO_OAUTH_SCOPE}&response_type=token&redirect_uri=${ITCHIO_OAUTH_REDIRECT}`,
  );
};

// Api key for fetching with global scope
export const createApiKeyWeb = () => {
  Linking.openURL("https://itch.io/user/settings/api-keys");
};

// Check if token is valid and save it
export const checkToken = async token => {
  try {
    const response = await fetchCredentialsInfo(token);

    let credentialsInfo = await response.json();

    if (credentialsInfo.errors?.length) throw Error("Invalid Token");

    const fetchAccountResponse = await fetchAccountInfo(token);

    const {user} = await fetchAccountResponse.json();

    await AsyncStorage.setItem("userToken", token);
    await AsyncStorage.setItem("userName", user?.username || "" );
    await AsyncStorage.setItem("userProfile", user?.url || "");

    return JSON.stringify(credentialsInfo);
  } catch (e) {
    console.log(e);
  }
};

// Remove token from local storage
export const asyncLogout = async () => {
  await AsyncStorage.removeItem("userToken");
  await AsyncStorage.removeItem("userName");
  await AsyncStorage.removeItem("userProfile");
};

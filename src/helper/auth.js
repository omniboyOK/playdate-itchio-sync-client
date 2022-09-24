import {
  ITCHIO_OAUTH_CLIENT,
  ITCHIO_OAUTH_REDIRECT,
  ITCHIO_OAUTH_SCOPE,
} from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Linking} from "react-native-windows";
import {fetchCredentialsInfo} from "../api/itchio";

export const signInAsync = () => {
  Linking.openURL(
    `https://itch.io/user/oauth?client_id=${ITCHIO_OAUTH_CLIENT}&scope=${ITCHIO_OAUTH_SCOPE}&response_type=token&redirect_uri=${ITCHIO_OAUTH_REDIRECT}`,
  );
};

export const checkToken = async token => {
  try {
    const response = await fetchCredentialsInfo(token);

    let credentialsInfo = await response.json();

    if (credentialsInfo.errors?.length) throw Error("Invalid Token");

    await AsyncStorage.setItem("userToken", token);

    return JSON.stringify(credentialsInfo);
  } catch (e) {
    console.log(e);
  }
};

export const getAccessTokenAsync = async () => {
  const accessToken = await AsyncStorage.getItem("userToken");

  if (!accessToken) return null;

  const info = await checkToken(accessToken);
  return {accessToken, info};
};

export const asyncLogout = async () => {
  await AsyncStorage.removeItem("userToken");
};

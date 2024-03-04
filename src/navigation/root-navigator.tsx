import {NavigationContainer} from "@react-navigation/native";
import React, {useCallback, useEffect} from "react";
import {navigationRef} from "./service";
import MainStack from "./stacks/mainStack/main-stack";
import useItchioStore from "../store/itchio";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStack from "./stacks/authStack/auth-stack";

const RootNavigator = () => {
  const {validateApiKey, token} = useItchioStore();

  const asyncLogin = useCallback(async () => {
    const accessToken = await AsyncStorage.getItem("userToken");
    validateApiKey(accessToken || "");
  }, [validateApiKey]);

  useEffect(() => {
    asyncLogin();
  }, [asyncLogin]);

  return (
    <NavigationContainer ref={navigationRef}>
      {token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;

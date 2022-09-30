import React, {useCallback, useEffect} from "react";
import {NavigationContainer} from "@react-navigation/native";
import MainStack from "./navigation/stacks/mainStack/MainStack";
import NavBar from "./navigation/stacks/navBar/NavBar";
import {enableScreens} from "react-native-screens";
import {createStackNavigator} from "@react-navigation/stack";
import {MAIN_STACK} from "./constants/routes";
import {navigationRef} from "./navigation/service";
import useItchioStore from "./store/itchio";
import AsyncStorage from "@react-native-async-storage/async-storage";

enableScreens();

const Stack = createStackNavigator();

const MainScreen = () => {
  const {validateToken} = useItchioStore();

  const asyncLogin = useCallback(async () => {
    const accessToken = await AsyncStorage.getItem("userToken");
    validateToken(accessToken);
  }, []);

  useEffect(() => {
    asyncLogin();
  }, [asyncLogin]);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <NavBar />
        <Stack.Navigator>
          <Stack.Screen
            name={MAIN_STACK}
            component={MainStack}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MainScreen;

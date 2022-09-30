import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import MainStack from "./navigation/stacks/mainStack/MainStack";
import NavBar from "./navigation/stacks/navBar/NavBar";
import {enableScreens} from "react-native-screens";
import {createStackNavigator} from "@react-navigation/stack";
import {MAIN_STACK} from "./constants/routes";

enableScreens();

export const navigationRef = React.createRef();
const Stack = createStackNavigator();

const MainScreen = () => {
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <NavBar navigator={navigationRef} />
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

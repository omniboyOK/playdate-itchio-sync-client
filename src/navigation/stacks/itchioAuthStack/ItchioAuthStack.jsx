import React from "react";
import ItchioOAuth from "../../../screens/itchioOauth/ItchioOauth";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const ItchioAuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ItchioLogin" component={ItchioOAuth} />
    </Stack.Navigator>
  );
};

export default ItchioAuthStack;

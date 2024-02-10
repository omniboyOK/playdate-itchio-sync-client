import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {
  ITCHIO_AUTH_ROUTE,
} from "../../../constants/routes";
import ItchioOAuth from "../../../screens/Itchio/itchioOauth/ItchioOauth";
import {AuthStackParamList} from "../../types";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ITCHIO_AUTH_ROUTE}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={ITCHIO_AUTH_ROUTE}
        component={ItchioOAuth}
        key={ITCHIO_AUTH_ROUTE}
        options={{}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

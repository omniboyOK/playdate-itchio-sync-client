import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {
  ITCHIO_AUTH_ROUTE,
  PLAYDATE_AUTH_ROUTE,
} from "../../../constants/routes";
import PlaydateForm from "../../../screens/playdate/playdateAuth/playdate-auth";
import ItchioOAuth from "../../../screens/Itchio/itchioOauth/ItchioOauth";
import {AuthStackParamList} from "../../types";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={PLAYDATE_AUTH_ROUTE}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={PLAYDATE_AUTH_ROUTE}
        component={PlaydateForm}
        key={PLAYDATE_AUTH_ROUTE}
        options={{}}
      />
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

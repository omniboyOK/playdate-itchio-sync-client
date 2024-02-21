import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {ITCHIO_API_AUTH_ROUTE, ITCHIO_AUTH_ROUTE} from "../../../constants/routes";
// import ItchioOAuth from "../../../screens/Itchio/itchioOauth/itchio-oauth";
import {AuthStackParamList} from "../../types";
import ItchioApiLogin from "screens/Itchio/itchioApiLogin/itchio-api-login";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ITCHIO_AUTH_ROUTE}
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen
        name={ITCHIO_AUTH_ROUTE}
        component={ItchioOAuth}
        key={ITCHIO_AUTH_ROUTE}
        options={{}}
      /> */}
      <Stack.Screen
        name={ITCHIO_API_AUTH_ROUTE}
        component={ItchioApiLogin}
        key={ITCHIO_API_AUTH_ROUTE}
        options={{}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {ITCHIO_AUTH_ROUTE} from "../../../constants/routes";
import mainStackRoutes from "./mainStackRoutes";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={ITCHIO_AUTH_ROUTE}
        screenOptions={{headerLeft: null}}>
        {mainStackRoutes.map(item => (
          <Stack.Screen
            name={item.name}
            component={item.component}
            key={item.name}
            options={item.options}
          />
        ))}
      </Stack.Navigator>
    </>
  );
};

export default MainStack;

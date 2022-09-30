import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import useItchioStore from "../../../store/itchio";
import itchioStackRoutes from "../itchioStack/ItchioStackRoutes";
import mainStackRoutes from "./mainStackRoutes";

const Stack = createStackNavigator();

const MainStack = () => {
  const {token} = useItchioStore();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerLeft: null,
          headerBackgroundContainerStyle: {
            backgroundColor: "black",
            color: "red",
          },
        }}>
        {mainStackRoutes.map(item => (
          <Stack.Screen
            name={item.name}
            component={item.component}
            key={item.name}
            options={item.options}
          />
        ))}
        {token &&
          itchioStackRoutes.map(item => (
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

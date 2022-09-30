import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import ContentView from "../../../screens/contentView/ContentView";
import ItchioOAuth from "../../../screens/itchioOauth/ItchioOauth";
import useItchioStore from "../../../store/itchio";

const Stack = createNativeStackNavigator();

const ItchioStack = () => {
  const {token} = useItchioStore();

  return (
    <Stack.Navigator>
      {token ? (
        <Stack.Screen name="ItchioLogin" component={ContentView} />
      ) : (
        <Stack.Screen name="ItchioLogin" component={ItchioOAuth} />
      )}
    </Stack.Navigator>
  );
};

export default ItchioStack;

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import {ITCHIO_AUTH_ROUTE, ITCHIO_STORE_ROUTE} from "../../../constants/routes";
import ItchioGames from "../../../screens/Itchio/ItchioGames/ItchioGames";
import ItchioOAuth from "../../../screens/Itchio/itchioOauth/ItchioOauth";
import useItchioStore from "../../../store/itchio";

const Stack = createNativeStackNavigator();

const ItchioStack = () => {
  const {token} = useItchioStore();

  return (
    <Stack.Navigator>
      {!token ? (
        <Stack.Screen name={ITCHIO_AUTH_ROUTE} component={ItchioOAuth} />
      ) : null}
      <Stack.Screen name={ITCHIO_STORE_ROUTE} component={ItchioGames} />
    </Stack.Navigator>
  );
};

export default ItchioStack;

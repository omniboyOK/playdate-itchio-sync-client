import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {
  FAVOURITE_GAMES_ROUTE,
  ITCHIO_OWNED_ROUTE,
  ITCHIO_STORE_ROUTE,
  PLAYDATE_AUTH_ROUTE,
} from "../../../constants/routes";
import ItchioGames from "../../../screens/Itchio/ItchioGames/storeGames/ItchioGames";
import {MainStackParamList} from "../../types";
import PlaydateForm from "screens/playdate/playdateAuth/playdate-auth";

const Stack = createStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackgroundContainerStyle: {
          backgroundColor: "black",
        },
      }}>
      <Stack.Screen
        name={ITCHIO_OWNED_ROUTE}
        component={ItchioGames}
        key={ITCHIO_OWNED_ROUTE}
      />
      <Stack.Screen
        name={FAVOURITE_GAMES_ROUTE}
        component={ItchioGames} // Replace with favourite games
        key={FAVOURITE_GAMES_ROUTE}
      />
      <Stack.Screen
        name={ITCHIO_STORE_ROUTE}
        component={ItchioGames} // Replace with store games
        key={ITCHIO_STORE_ROUTE}
      />
      <Stack.Screen
        name={PLAYDATE_AUTH_ROUTE}
        component={PlaydateForm}
        key={PLAYDATE_AUTH_ROUTE}
        options={{}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

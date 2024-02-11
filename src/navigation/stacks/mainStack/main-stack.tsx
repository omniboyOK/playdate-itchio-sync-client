import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {
  FAVOURITE_GAMES_ROUTE,
  HOME_SCREEN_ROUTE,
  ITCHIO_OWNED_ROUTE,
  ITCHIO_STORE_ROUTE,
  PLAYDATE_AUTH_ROUTE,
} from "../../../constants/routes";
import ItchioGames from "../../../screens/Itchio/ItchioGames/storeGames/ItchioGames";
import {MainStackParamList} from "../../types";
import PlaydateForm from "../../../screens/playdate/playdateAuth/playdate-auth";
import Home from "screens/Home/home";

const Stack = createStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={HOME_SCREEN_ROUTE}
      screenOptions={{
        headerShown: false,
        headerTitle: "Home",
      }}>
      <Stack.Screen
        name={HOME_SCREEN_ROUTE}
        component={Home}
        key={HOME_SCREEN_ROUTE}
      />
      <Stack.Screen
        name={ITCHIO_OWNED_ROUTE}
        component={ItchioGames}
        key={ITCHIO_OWNED_ROUTE}
        options={{headerTitle: "My Games", headerShown: true}}
      />
      <Stack.Screen
        name={FAVOURITE_GAMES_ROUTE}
        component={ItchioGames} // Replace with favourite games
        key={FAVOURITE_GAMES_ROUTE}
        options={{headerTitle: "Favourite Games", headerShown: true}}
      />
      <Stack.Screen
        name={ITCHIO_STORE_ROUTE}
        component={ItchioGames} // Replace with store games
        key={ITCHIO_STORE_ROUTE}
        options={{headerTitle: "Itchio Store", headerShown: true}}
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

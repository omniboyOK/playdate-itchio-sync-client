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
import {TextStyle, ViewStyle} from "react-native-windows";
import FavouriteGames from "screens/Itchio/ItchioGames/favouriteGames/favourite-games";
import OwnedGames from "screens/Itchio/ItchioGames/ownedGames/owned-games";
import {ACRYLIC_COLOR} from "constants/colors";

const Stack = createStackNavigator<MainStackParamList>();

const headerCustomStyle: ViewStyle = {
  backgroundColor: ACRYLIC_COLOR,
  height: 48,
  borderTopWidth: 0,
  borderBottomWidth: 0,
};

const customTitleStyle: TextStyle = {
  fontFamily: "Latto-Bold",
  fontSize: 24,
  color: "white",
};

const createCustomHeaderConfig = (title: string) => {
  return {
    headerTitle: title,
    headerShown: true,
    headerStyle: headerCustomStyle,
    headerTitleStyle: customTitleStyle,
    headerTintColor: "white",
  };
};

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
        component={OwnedGames}
        key={ITCHIO_OWNED_ROUTE}
        options={createCustomHeaderConfig("My Games")}
      />
      <Stack.Screen
        name={FAVOURITE_GAMES_ROUTE}
        component={FavouriteGames} // TODO: Replace with favourite games
        key={FAVOURITE_GAMES_ROUTE}
        options={createCustomHeaderConfig("Favourite Games")}
      />
      <Stack.Screen
        name={ITCHIO_STORE_ROUTE}
        component={ItchioGames} // TODO: Replace with store games
        key={ITCHIO_STORE_ROUTE}
        options={createCustomHeaderConfig("Itchio Store")}
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

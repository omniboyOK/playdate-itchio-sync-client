import {
  AUTH_STACK,
  FAVOURITE_GAMES_ROUTE,
  HOME_SCREEN_ROUTE,
  ITCHIO_API_AUTH_ROUTE,
  ITCHIO_AUTH_ROUTE,
  ITCHIO_OWNED_ROUTE,
  ITCHIO_STORE_ROUTE,
  MAIN_STACK,
  PLAYDATE_AUTH_ROUTE,
} from "../constants/routes";

export type RootStackParamList = {
  [MAIN_STACK]: undefined;
  [AUTH_STACK]: undefined;
};

export type MainStackParamList = {
  [ITCHIO_OWNED_ROUTE]: undefined;
  [FAVOURITE_GAMES_ROUTE]: undefined;
  [PLAYDATE_AUTH_ROUTE]: undefined;
  [ITCHIO_STORE_ROUTE]: undefined;
  [HOME_SCREEN_ROUTE]: undefined;
};

export type AuthStackParamList = {
  [ITCHIO_AUTH_ROUTE]: undefined;
  [ITCHIO_API_AUTH_ROUTE]: undefined;
};

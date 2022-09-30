import {
  ITCHIO_OWNED_ROUTE,
  ITCHIO_STORE_ROUTE,
} from "../../../constants/routes";
import OwnedGames from "../../../screens/Itchio/ItchioGames/ownedGames/OwnedGames";
import ItchioGames from "../../../screens/Itchio/ItchioGames/storeGames/ItchioGames";

const itchioStackRoutes = [
  {
    name: ITCHIO_OWNED_ROUTE,
    component: OwnedGames,
    options: {title: "Itchio Owned Games"},
    navbar: "Owned",
  },
  {
    name: ITCHIO_STORE_ROUTE,
    component: ItchioGames,
    options: {title: "Itchio Playdate Games"},
    navbar: "Store",
  },
];

export default itchioStackRoutes;

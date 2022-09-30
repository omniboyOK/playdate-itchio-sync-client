import {
  ITCHIO_AUTH_ROUTE,
  PLAYDATE_AUTH_ROUTE,
} from "../../../constants/routes";
import ItchioOAuth from "../../../screens/itchioOauth/ItchioOauth";
import PlaydateForm from "../../../screens/playdate/PlaydateForm";

const mainStackRoutes = [
  {
    name: ITCHIO_AUTH_ROUTE,
    component: ItchioOAuth,
    options: {title: "Itchio"},
    navbar: "Itchio",
  },
  {
    name: PLAYDATE_AUTH_ROUTE,
    component: PlaydateForm,
    options: {title: "Playdate"},
    navbar: "Playdate",
  },
];

export default mainStackRoutes;

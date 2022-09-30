import {
  ITCHIO_AUTH_ROUTE,
  PLAYDATE_AUTH_ROUTE,
} from "../../../constants/routes";
import ItchioOAuth from "../../../screens/Itchio/itchioOauth/ItchioOauth";
import PlaydateForm from "../../../screens/playdate/PlaydateForm";

const mainStackRoutes = [
  {
    name: PLAYDATE_AUTH_ROUTE,
    component: PlaydateForm,
    options: {title: "Playdate"},
    navbar: "Playdate",
  },
  {
    name: ITCHIO_AUTH_ROUTE,
    component: ItchioOAuth,
    options: {title: "Itchio Login"},
    navbar: "Itchio Login",
  },
];

export default mainStackRoutes;

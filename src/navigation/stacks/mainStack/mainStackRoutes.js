import {
  ITCHIO_API_AUTH_ROUTE,
  ITCHIO_AUTH_ROUTE,
  PLAYDATE_AUTH_ROUTE,
} from "../../../constants/routes";
import ItchioApiForm from "../../../screens/Itchio/ItchioApiLogin/ItchioForm";
import ItchioOAuth from "../../../screens/Itchio/itchioOauth/ItchioOauth";
import PlaydateForm from "../../../screens/playdate/playdateAuth/playdate-auth";

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
  {
    name: ITCHIO_API_AUTH_ROUTE,
    component: ItchioApiForm,
    options: {title: "Itchio Api"},
    navbar: "Itchio Api Login",
  },
];

export default mainStackRoutes;

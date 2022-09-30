import {ITCHIO_STACK, PLAYDATE_AUTH_ROUTE} from "../../../constants/routes";
import PlaydateForm from "../../../screens/playdate/PlaydateForm";
import ItchioStack from "../itchioStack/ItchioStack";

const mainStackRoutes = [
  {
    name: PLAYDATE_AUTH_ROUTE,
    component: PlaydateForm,
    options: {title: "Playdate"},
    navbar: "Playdate",
  },
  {
    name: ITCHIO_STACK,
    component: ItchioStack,
    options: {title: "Itchio"},
    navbar: "Itchio",
  },
];

export default mainStackRoutes;

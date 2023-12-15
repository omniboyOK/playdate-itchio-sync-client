import create from "zustand";
import {fetchOwnedGames} from "../api/itchio";
import {asyncLogout, checkToken} from "../helper/auth";
import {getAllPotentialPlaydateGameNames} from "../helper/itchio";

const useItchioStore = create((set, get) => ({
  gamestore: [],
  token: null,
  account: {
    name: "",
    link: "",
  },
  awaitingToken: false,
  favouriteGames: [],
  ownedGames: [],
  logout: async () => {
    set({token: null, awaitingToken: false});
    await asyncLogout();
  },
  validateToken: async token => {
    const result = await checkToken(token);
    if (result) {
      console.log("ITCHIO LOGIN - OK");
      set({token: token});
    }
  },
  setGameStore: async () => {
    if (!get().gamestore.length) {
      const response = await getAllPotentialPlaydateGameNames();
      set({gamestore: response});
    }
  },
  setOwnedGames: async () => {
    if (!get().ownedGames.length) {
      const response = await fetchOwnedGames(get().token);
      console.log(response);
      const games = [];

      if (response?.owned_keys.length > 0) {
        response?.owned_keys?.map(item => {
          item.game.download_key_id = item.id;
          games.push(item.game);
        });
      }
      set({ownedGames: games});
    }
  },
  setAwait: bool => set({awaitingToken: bool}),
}));

export default useItchioStore;

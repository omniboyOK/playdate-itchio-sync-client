import { create } from "zustand";
import { fetchOwnedGames } from "../api/itchio";
import { asyncLogout, checkToken } from "../helper/auth";
import { getPotentialPlaydateGameNames } from "../helper/itchio";

const useItchioStore = create((set, get) => ({
  gamestore: [],
  favouriteGames: [],
  ownedGames: [],
  loadingStore: false,
  loadingOwned: false,
  loadingFavourites: false,
  token: null,
  account: {
    name: "",
    link: "",
  },
  awaitingToken: false,
  logout: async () => {
    set({ token: null, awaitingToken: false });
    await asyncLogout();
  },
  validateToken: async token => {
    set({ awaitingToken: true });
    const result = await checkToken(token);
    if (result) {
      set({ token: token });
    }
    set({ awaitingToken: false });
  },
  setGameStore: async () => {
    set({ loadingStore: true });
    if (!get().gamestore.length) {
      const response = await getPotentialPlaydateGameNames(1);
      set({ gamestore: response });
    }
    set({ loadingStore: false });

  },
  setOwnedGames: async () => {
    set({ loadingOwned: true });
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
      set({ ownedGames: games });
    }
    set({ loadingOwned: false });
  },
  setAwait: bool => set({ awaitingToken: bool }),
}));

export default useItchioStore;

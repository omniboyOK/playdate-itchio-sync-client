import { create } from "zustand";
import { fetchAccountInfo, fetchOwnedGames } from "../api/itchio";
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
    image: "",
  },
  awaitingToken: false,
  loadingAccountInfo: false,
  logout: async () => {
    set({ token: null, awaitingToken: false });
    await asyncLogout();
  },
  getAccountInfo: async token => {
    set({ loadingAccountInfo: true });
    const response = await fetchAccountInfo(token);
    const { user } = await response.json();
    set({
      account: { name: user.display_name, image: user.cover_url, link: user.url },
    });
    set({ loadingAccountInfo: false });
  },
  validateToken: async token => {
    set({ awaitingToken: true });
    const result = await checkToken(token);
    if (result) {
      set({ token: token });
    }
    set({ awaitingToken: false });
  },
  fetchItchioStore: async (page = 1) => {
    set({ loadingStore: true });
    if (!get().gamestore.length) {
      const response = await getPotentialPlaydateGameNames(page);
      set({ gamestore: response });
    }
    set({ loadingStore: false });
  },
  fetchItchioOwnedGames: async () => {
    set({ loadingOwned: true });

    // Get Games from itchio
    if (!get().ownedGames.length) {
      const { owned_keys } = await fetchOwnedGames(get().token);
      const games = [];

      if (owned_keys?.length > 0) {
        // Loop owned games
        owned_keys.map(item => {
          const { game, updated_at, id } = item;

          games.push({
            id: game.id,
            title: game.title,
            img: game.cover_url,
            updated_at: updated_at,
            download_key: id, // set download key
          });
        });
      }

      set({ ownedGames: games });
    }
    set({ loadingOwned: false });
  },
  setAwait: bool => set({ awaitingToken: bool }),
  setGameStatus: async (game, status) => {
    let games = get().ownedGames;

    const updatedGames = games.map(g => {
      if (g.id === game.id) {
        console.log({ ...g, status });
        return { ...g, status };
      } else {
        return g;
      }
    });

    set({ ownedGames: updatedGames });
  },
}
));

export default useItchioStore;

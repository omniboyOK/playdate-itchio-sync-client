import {create} from "zustand";
import {fetchAccountInfo, fetchOwnedGames} from "../api/itchio";
import {asyncLogout, checkApiKey, checkOauthToken} from "../helper/auth";
import {getPotentialPlaydateGameNames} from "../helper/itchio";
import {Game, ItchioGame, ItchioUserInfo, OwnedGame} from "types/itchio.types";

interface ItchioStoreState {
  gamestore: ItchioGame[];
  favouriteGames: Game[];
  ownedGames: OwnedGame[];
  loadingStore: boolean;
  loadingOwned: boolean;
  loadingFavourites: boolean;
  token: string;
  account: ItchioUserInfo;
  awaitingToken: boolean;
  loadingAccountInfo: boolean;
}

interface ItchioStoreActions {
  logout: () => Promise<void>;
  getAccountInfo: (token: string) => Promise<void>;
  validateApiKey: (token: string) => Promise<void>;
  validateToken: (token: string) => Promise<void>;
  fetchItchioStore: (page?: number) => Promise<void>;
  fetchItchioOwnedGames: () => Promise<void>;
  setAwait: (bool: boolean) => void;
  setGameStatus: (game: Game, status: string) => Promise<void>;
}

const useItchioStore = create<ItchioStoreState & ItchioStoreActions>(
  (set, get) => ({
    gamestore: [],
    favouriteGames: [],
    ownedGames: [],
    loadingStore: false,
    loadingOwned: false,
    loadingFavourites: false,
    token: "",
    account: {
      name: "",
      link: "",
      image: "",
    },
    awaitingToken: false,
    loadingAccountInfo: false,
    logout: async () => {
      set({token: "", awaitingToken: false});
      await asyncLogout();
    },
    getAccountInfo: async token => {
      set({loadingAccountInfo: true});
      const response = await fetchAccountInfo(token);
      const {user} = await response.json();
      set({
        account: {
          name: user.display_name,
          image: user.cover_url,
          link: user.url,
        },
      });
      set({loadingAccountInfo: false});
    },
    validateApiKey: async token => {
      set({awaitingToken: true});
      const result = await checkApiKey(token);
      if (result) {
        set({token: token});
      }
      set({awaitingToken: false});
    },
    validateToken: async token => {
      set({awaitingToken: true});
      const result = await checkOauthToken(token);
      if (result) {
        set({token: token});
      }
      set({awaitingToken: false});
    },
    fetchItchioStore: async (page = 1) => {
      set({loadingStore: true});
      if (!get().gamestore.length) {
        const response = await getPotentialPlaydateGameNames(page);
        set({gamestore: response});
      }
      set({loadingStore: false});
    },
    fetchItchioOwnedGames: async () => {
      set({loadingOwned: true});

      // Get Games from itchio
      if (!get().ownedGames.length) {
        const {owned_keys} = await fetchOwnedGames(get().token || "");

        const games: OwnedGame[] = [];

        if (owned_keys?.length > 0) {
          // Loop owned games
          owned_keys.map(item => {
            const {game, updated_at, id} = item;

            games.push({
              id: game.id,
              title: game.title,
              img: game.cover_url,
              updated_at: updated_at,
              download_key: id, // set download key
            });
          });
        }

        set({ownedGames: games});
      }
      set({loadingOwned: false});
    },
    setAwait: bool => set({awaitingToken: bool}),
    setGameStatus: async (game, status) => {
      const games = get().ownedGames;

      const updatedGames = games.map(g => {
        if (g.id === game.id) {
          console.log({...g, status});
          return {...g, status};
        } else {
          return g;
        }
      });

      set({ownedGames: updatedGames});
    },
  }),
);

export default useItchioStore;

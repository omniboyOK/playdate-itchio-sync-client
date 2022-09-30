import create from "zustand";
import {asyncLogout, checkToken} from "../helper/auth";
import {getAllPotentialPlaydateGameNames} from "../helper/itchio";

const useItchioStore = create(set => ({
  gamestore: [],
  token: null,
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
      set({token: token});
    }
  },
  setGameStore: async () => {
    const response = await getAllPotentialPlaydateGameNames();
    set({gamestore: response});
  },
  setOwnedGames: async () => {
    const response = await getAllPotentialPlaydateGameNames();
    set({ownedGames: response});
  },
  setAwait: bool => set({awaitingToken: bool}),
}));

export default useItchioStore;

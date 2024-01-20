import { create } from "zustand";
import {asyncLogout, getSideloads, login} from "../helper/playdate";

const usePlaydateStore = create(set => ({
  token: null,
  isLoading: false,
  ownedGames: [],
  logout: async () => {
    set({token: null, isLoading: false});
    await asyncLogout();
  },
  login: async (user, pass) => {
    set({isLoading: true});
    const token = await login(user, pass);
    set({isLoading: false, token: token});
  },
  setLoading: bool => set({isLoading: bool}),
  getOwnedGames: async () => {
    const games = await getSideloads();
    console.log(games);
    set({ownedGames: games});
  },
}));

export default usePlaydateStore;

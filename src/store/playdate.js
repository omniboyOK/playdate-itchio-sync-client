import { create } from "zustand";
import { asyncLogout, getSideloads, login } from "../helper/playdate";
import useItchioStore from "./itchio";

const usePlaydateStore = create(set => ({
  token: null,
  isLoading: false,
  ownedGames: [],
  logout: async () => {
    set({ token: null, isLoading: false });
    await asyncLogout();
  },
  login: async (user, pass) => {
    set({ isLoading: true });
    const token = await login(user, pass);
    set({ isLoading: false, token: token });
  },
  setLoading: bool => set({ isLoading: bool }),
  getOwnedGames: async () => {
    const games = await getSideloads();
    set({ ownedGames: games });
  },
  sideLoadGame: async (gameId) => {
    const { ownedGames, setOwnedGames } = useItchioStore.getState();

    // Find the game by ID and update its 'sideloaded' property
    const updatedOwnedGames = ownedGames.map(game =>
      game.id === gameId ? { ...game, sideloaded: true } : game
    );

    // Use the action from useItchioStore to update the state
    setOwnedGames(updatedOwnedGames);
  }
}));

export default usePlaydateStore;

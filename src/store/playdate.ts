import {create} from "zustand";
import {asyncLogout, getSideloads, login} from "../helper/playdate";
import {PlaydateGame} from "types/playdate.types";

interface PlaydateStoreState {
  token: string | null;
  isLoading: boolean;
  ownedGames: PlaydateGame[];
  isSideLoading: boolean;
}

type PlaydateActions = {
  logout: () => Promise<void>;
  login: (user: string, pass: string) => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  getOwnedGames: () => Promise<void>;
  sideLoadGame: () => void;
};

const usePlaydateStore = create<PlaydateStoreState & PlaydateActions>(set => ({
  token: null,
  isLoading: false,
  ownedGames: [],
  isSideLoading: false,
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
    set({ownedGames: games});
  },
  sideLoadGame: () => {
    set({isSideLoading: true});

    /* const {ownedGames, fetchItchioOwnedGames} = useItchioStore.getState();

    // Find the game by ID and update its 'sideloaded' property
    const updatedOwnedGames = ownedGames.map(game =>
      game.id === gameId ? {...game, sideloaded: true} : game,
    );

    // Use the action from useItchioStore to update the state
    fetchItchioOwnedGames(updatedOwnedGames); */
    set({isSideLoading: false});
  },
}));

export default usePlaydateStore;

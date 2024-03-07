import {create} from "zustand";
import {
  asyncPlaydateLogout,
  getPlaydateCredentials,
  getSideloads,
  pdLogin,
  savePlaydateCred,
} from "../helper/playdate";
import {PlaydateGame} from "types/playdate.types";

interface PlaydateStoreState {
  showPlaydateLogin: boolean;
  token: string;
  isLoading: boolean;
  ownedGames: PlaydateGame[];
  isSideLoading: boolean;
  error: string;
}

type PlaydateActions = {
  logout: () => Promise<void>;
  login: (user: string, pass: string) => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  getOwnedGames: () => Promise<void>;
  sideLoadGame: () => void;
  signInPlaydateAsync: () => void;
};

const usePlaydateStore = create<PlaydateStoreState & PlaydateActions>(set => ({
  showPlaydateLogin: false,
  token: "",
  isLoading: false,
  error: "",
  ownedGames: [],
  isSideLoading: false,
  logout: async () => {
    set({token: "", isLoading: false});
    await asyncPlaydateLogout();
  },
  login: async (user, pass) => {
    set({isLoading: true, error: ""});
    try {
      await pdLogin(user, pass);
      await savePlaydateCred(user, pass);
      set({isLoading: false, token: "playdate"});
    } catch (e) {
      set({isLoading: false, token: "", error: "ERROR LOGIN TO PLAYDATE"});
    }
  },
  signInPlaydateAsync: async () => {
    set({isLoading: true, token: ""});
    try {
      const {user, pass} = await getPlaydateCredentials();

      if (user && pass) {
        await pdLogin(user, pass);
      } else {
        await asyncPlaydateLogout();
      }
      set({isLoading: false, token: "playdate"});
    } catch (e) {
      set({isLoading: false, token: "", error: "ERROR LOGIN TO PLAYDATE"});
    }
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

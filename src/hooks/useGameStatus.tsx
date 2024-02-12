import {Game, GameStatus} from "types/itchio.types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCurrentGameVersion = (game: Game): string | null => {
  // TODO: check if game download, return version if true
  try {
    const {version} = JSON.parse(localStorage.getItem(game.id) || "");

    return version;
  } catch (e) {
    return null;
  }
};

const useGameStatus = (game: Game): GameStatus => {
  try {
    const currentVersion = getCurrentGameVersion(game);
    if (currentVersion === null) {
      return "download";
    }

    if (game.version === currentVersion) {
      return "ok";
    } else {
      return "update";
    }
  } catch (error) {
    return "error";
  }
};

export default useGameStatus;

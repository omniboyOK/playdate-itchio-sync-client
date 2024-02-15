import {getGame} from "helper/itchio";
import {useEffect, useState} from "react";
import {Game, GameStatus} from "types/itchio.types";

const useGameStatus = (game: Game): GameStatus => {
  const [status, setStatus] = useState<GameStatus>(); // Corrected usage

  useEffect(() => {
    const getCurrentGameVersion = async (
      game: Game,
    ): Promise<string | null> => {
      try {
        const savedGame = await getGame(game.id.toString());

        if (savedGame) {
          return savedGame.updated_at;
        }

        return null;
      } catch (e) {
        return null;
      }
    };

    const getStatus = async () => {
      try {
        const currentVersion = await getCurrentGameVersion(game);

        if (currentVersion === null) {
          setStatus("download");
          return;
        }

        if (game.sideloaded) {
          setStatus("ok");
          return;
        }

        if (game.updated_at === currentVersion) {
          setStatus("ready");
        } else {
          setStatus("update");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    getStatus();
  }, [game, game.updated_at, game.sideloaded]); // Include all dependencies used inside the effect

  return status;
};

export default useGameStatus;

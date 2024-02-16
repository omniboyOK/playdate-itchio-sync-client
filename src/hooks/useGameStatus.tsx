import {getGameFromStorage} from "helper/itchio";
import {useEffect, useState} from "react";
import {Game} from "types/itchio.types";

const useGameStatus = (game: Game) => {
  const [updatedGame, setUpdatedGame] = useState(game);

  useEffect(() => {
    console.log("REACTING", game.id);
    const updateGameStatus = async () => {
      if (!game || !game.id) {
        setUpdatedGame({...game, status: "error"});
      }

      const localGame = await getGameFromStorage(game.id.toString());
      if (localGame) {
        if (localGame.updated_at < game.updated_at) {
          setUpdatedGame({...game, status: "update"});
        }
        setUpdatedGame({
          ...game,
          status: localGame.status === "done" ? "done" : "sideload",
        });
      } else {
        setUpdatedGame({...game, status: "download"});
      }
    };

    updateGameStatus();
  }, [game]);

  return updatedGame;
};

export default useGameStatus;

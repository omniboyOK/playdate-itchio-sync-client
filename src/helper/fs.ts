import {
  downloadFile,
  exists,
  mkdir,
  DocumentDirectoryPath,
} from "@dr.pogodin/react-native-fs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Game, GameStorageInfo} from "types/itchio.types";
import {getGameFromStorage, saveGameToStorage} from "./itchio";
import {debugLog} from "./debug";

export const GAMES_FOLDER = `${DocumentDirectoryPath}/myAppGames`;

export const createAppFolder = async () => {
  debugLog("creating folder");

  const folderPath = GAMES_FOLDER;
  const isCreated = await exists(folderPath);
  if (!isCreated) {
    debugLog("folder created succesfully");
    await mkdir(folderPath);
  }

  return folderPath;
};

const syncDownloadedData = (gameInfo: GameStorageInfo): void => {
  debugLog("saving game data");

  saveGameToStorage(gameInfo);
};

export const checkGameFile = async (game: Game): Promise<boolean> => {
  const result = await getGameFromStorage(game.id.toString());

  return result ? true : false;
};

export const downloadGame = async (
  gameUrl: string,
  gameInfo: Game,
  filename: string,
  authorization: string,
) => {
  const folderPath = await createAppFolder();
  const filePath = `${folderPath}/${filename}`;

  try {
    debugLog("starting download");

    const {promise} = downloadFile({
      fromUrl: gameUrl,
      toFile: filePath,
      headers: {
        authorization,
      },
    });

    debugLog("downloading");

    const res = await promise;

    debugLog("finished downloading");

    console.log(res);

    await syncDownloadedData({...gameInfo, filename});
  } catch {
    console.log("fail");
  }
};

export const getDownloadedGames = async (games: Game[]): Promise<Game[]> => {
  const gameInfos = await Promise.all(
    games.map(async item => {
      const gameInfoString = await AsyncStorage.getItem(item.id.toString());
      return gameInfoString ? (JSON.parse(gameInfoString) as Game) : null;
    }),
  );
  return gameInfos.filter((gameInfo): gameInfo is Game => gameInfo !== null);
};

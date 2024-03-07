import {
  downloadFile,
  exists,
  mkdir,
  DocumentDirectoryPath,
  unlink,
} from "@dr.pogodin/react-native-fs";
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

    await downloadFile({
      fromUrl: gameUrl,
      toFile: filePath,
      headers: {
        authorization,
      },
    });

    await syncDownloadedData({...gameInfo, filename});

    debugLog("finished downloading");
  } catch {
    debugLog("error downloading game");
  }
};

export const purgeGameFolder = () => {
  unlink(GAMES_FOLDER);
};

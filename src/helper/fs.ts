import * as RNFS from "@dr.pogodin/react-native-fs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Game} from "types/itchio.types";
import {saveGame} from "./itchio";

export const GAMES_FOLDER = `${RNFS.DocumentDirectoryPath}/myAppGames`;

export const createAppFolder = async () => {
  console.log("Creating Folder");
  const folderPath = GAMES_FOLDER;
  const exists = await RNFS.exists(folderPath);
  if (!exists) {
    console.log("Folder created");
    await RNFS.mkdir(folderPath);
  }
  return folderPath;
};

export const downloadGame = async (
  gameUrl: string,
  gameInfo: Game,
  authorization: string,
) => {
  const folderPath = await createAppFolder();
  const filePath = `${folderPath}/${gameInfo.title}`;
  console.log("SETTED PATH");

  await RNFS.downloadFile({
    fromUrl: gameUrl,
    toFile: filePath,
    headers: {
      authorization,
    },
  })
    .promise.then(response => {
      if (response.statusCode == 200) {
        console.log("DOWNLOAD OK");
        saveGame(gameInfo);
      } else {
        console.log("SERVER ERROR", response);
      }
    })
    .catch(err => {
      if (err.description === "cancelled") {
        // cancelled by user
      }
      console.log(err);
    });
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

import DomSelector from "react-native-dom-parser";
import {fetchItchioTaggedGames, fetchOwnedGames} from "../api/itchio-service";
import {ATTRIBUTES, QUERY} from "../constants/itchio";
import {
  Game,
  GameDOMElement,
  GameStatus,
  GameStorageInfo,
} from "../types/itchio.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ApiOwnedGamesResponse, ApiOwnedKey} from "api/types/itchio.types";
import {exists, unlink} from "@dr.pogodin/react-native-fs";
import {GAMES_FOLDER} from "./fs";

const GAME_ID_ERROR = "error - unknown id";
const DEFAULT_GAME_IMG = "";

export async function getOwnedGames(
  authorization: string,
): Promise<ApiOwnedGamesResponse> {
  try {
    const result = await fetchOwnedGames(authorization);

    return result;
  } catch (error) {
    console.error("Error fetching owned games:", error);
    return {owned_keys: [], page: 0, per_page: 50};
  }
}

export async function getPotentialPlaydateGameNames(
  page: number,
): Promise<Game[]> {
  try {
    const response = await fetchItchioTaggedGames(page);
    const {content, num_items} = await response.json();

    if (num_items === 0) {
      return [];
    }

    const dom = DomSelector(content);
    const games = dom.getElementsByClassName(QUERY.GAME_DATA_CLASS);
    const gameList = games.map((gameElement: GameDOMElement) =>
      processGameElement(gameElement),
    );
    return gameList;
  } catch (error) {
    console.error("Error fetching potential playdate games:", error);
    return [];
  }
}

function processGameElement(gameElement: GameDOMElement): Game {
  const gameId = gameElement?.attributes[ATTRIBUTES.GAME_ID] || GAME_ID_ERROR;
  const titleElement = gameElement.getElementsByClassName(
    QUERY.GAME_TITLE_CLASS,
  );
  const imgElement = gameElement.getElementsByClassName(QUERY.GAME_IMAGE_CLASS);
  return {
    id: parseInt(gameId),
    // @ts-ignore: handled exception
    title: titleElement[0]?.children[0]?.text || "",
    // @ts-ignore: unreachable code in library
    img: imgElement[0]?.attributes[ATTRIBUTES.GAME_IMG] || DEFAULT_GAME_IMG,
    game_id: 0,
    status: "not_owned",
    updated_at: "",
    sideloaded: false,
  };
}

export async function getAllPotentialPlaydateGameNames(): Promise<string[]> {
  const allNames = new Set<string>();
  let loop = true;
  let page = 0;

  while (loop) {
    const names = await getPotentialPlaydateGameNames(page);
    if (names.length === 0) {
      loop = false;
    }
    names.forEach(name => allNames.add(name.title));
    page++;
  }

  return Array.from(allNames);
}

export async function saveGameToStorage(
  gameData: GameStorageInfo,
): Promise<void> {
  try {
    await AsyncStorage.setItem(
      gameData.id.toString(),
      JSON.stringify(gameData),
    );
  } catch (e) {
    console.log(e);
  }
}

export async function deleteGameFromStorage(id: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(id);
  } catch (e) {
    console.log(e);
  }
}

export async function getGameFromStorage(
  id: string,
): Promise<GameStorageInfo | null> {
  try {
    const item = await AsyncStorage.getItem(id);

    if (item) {
      return JSON.parse(item);
    }

    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function transformToGameObject(
  key: ApiOwnedKey,
  store: Game[],
): Promise<void> {
  try {
    const {game, updated_at, id, game_id} = key;

    // Check if playdate game
    if (
      !game.title.toLowerCase().includes("playdate") &&
      !game.short_text.toLowerCase().includes("playdate")
    ) {
      return;
    }

    // Check game status
    let localData = await getGameFromStorage(id.toString());
    let isFileAvailable = false;

    if (localData?.filename) {
      // Check file integrityc
      isFileAvailable = await exists(`${GAMES_FOLDER}/${localData?.filename}`);
    } else {
      // Games with no filename means something is wrong
      // Is better to purge the folder
      unlink(GAMES_FOLDER);
    }

    if (localData && !isFileAvailable) {
      // if file and data aren't sync we clean
      await deleteGameFromStorage(id.toString());
      localData = null;
    }

    let status: GameStatus = undefined;

    // If there is no local file
    if (!localData) {
      await deleteGameFromStorage(id.toString());
      status = "download";
    } else {
      // Check update needed
      if (updated_at > localData?.updated_at) {
        status = "update";
      } else {
        status = "sideload";
      }
    }

    store.push({
      id: id,
      title: game.title,
      img: game.cover_url,
      updated_at: updated_at,
      game_id: game_id,
      status,
    });
  } catch (e) {
    console.log(e);
  }
}

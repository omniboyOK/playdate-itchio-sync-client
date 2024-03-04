import DomSelector from "react-native-dom-parser";
import {fetchItchioTaggedGames, fetchOwnedGames} from "../api/itchio";
import {ATTRIBUTES, QUERY} from "../constants/itchio";
import {Game, GameDOMElement, ItchioGame} from "../types/itchio.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ApiOwnedGamesResponse} from "api/types/itchio.types";

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
): Promise<ItchioGame[]> {
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

function processGameElement(gameElement: GameDOMElement): ItchioGame {
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

export async function saveGame(game: Game): Promise<void> {
  try {
    await AsyncStorage.setItem(game.id.toString(), JSON.stringify(game));
  } catch (e) {
    console.log(e);
  }
}

export async function getGameFromStorage(id: string): Promise<Game | null> {
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

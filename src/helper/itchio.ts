import DomSelector from "react-native-dom-parser";
import {fetchItchioTaggedGames, fetchOwnedGames} from "../api/itchio";
import {ATTRIBUTES, QUERY} from "../constants/itchio";
import {
  Game,
  GameDOMElement,
  ItchioGame,
  OwnedGamesResponse,
} from "../types/itchio.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GAME_ID_ERROR = "error - unknown id";
const DEFAULT_GAME_IMG = "";

export async function getOwnedGames(
  authorization: string,
): Promise<OwnedGamesResponse> {
  try {
    const response = await fetchOwnedGames(authorization);
    const games = await response.json();
    console.log("OWNED GAMES ----->", games);
    return games;
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

export async function getGame(id: string): Promise<Game | null> {
  try {
    console.log("getGame", id);
    const item = await AsyncStorage.getItem(id);

    if (item) {
      console.log("FOUND GAME");
      return JSON.parse(item);
    }

    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

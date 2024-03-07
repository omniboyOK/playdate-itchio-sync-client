import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import DomSelector from "react-native-dom-parser";
import useItchioStore from "store/itchio";
import {Game} from "types/itchio.types";
import {PlaydateGame} from "types/playdate.types";
import {getGameFromStorage, saveGameToStorage} from "./itchio";
import {readFile} from "@dr.pogodin/react-native-fs";
import {GAMES_FOLDER} from "./fs";
import {debugLog} from "./debug";

export const savePlaydateCred = async (
  email: string,
  password: string,
): Promise<void> => {
  await AsyncStorage.setItem("playdateEmail", email);
  await AsyncStorage.setItem("playdatePassword", password);
};

export const getPlaydateCredentials = async (): Promise<{
  user: string | null;
  pass: string | null;
}> => {
  try {
    const user = await AsyncStorage.getItem("playdateEmail");
    const pass = await AsyncStorage.getItem("playdatePassword");
    return {
      user,
      pass,
    };
  } catch (e) {
    console.log(e);
    return {
      user: null,
      pass: null,
    };
  }
};

export const asyncPlaydateLogout = async (): Promise<void> => {
  await AsyncStorage.removeItem("playdateEmail");
  await AsyncStorage.removeItem("playdatePassword");
};

async function getCSRF(url: string): Promise<string> {
  const response = await fetch(url);
  const text = await response.text();

  const regex = /name="csrfmiddlewaretoken" value="([^"]+)"/;

  const matches = regex.exec(text);

  const csrfToken = matches?.length ? matches[1] : "";

  debugLog(csrfToken);

  return csrfToken;
}

export const pdLogin = async (
  username: string,
  password: string,
): Promise<void> => {
  try {
    debugLog("login to playdate");

    const token = await getCSRF("https://play.date/signin/");

    debugLog("got csrf");

    const body = new URLSearchParams();
    body.append("csrfmiddlewaretoken", token);
    body.append("username", username);
    body.append("password", password);

    debugLog("starting login fetch");

    await fetch("https://play.date/", {
      body: body.toString(),
      method: "POST",
      headers: {
        Referer: "https://play.date/signin/",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    debugLog("Login ok");
  } catch (e) {
    console.log(e);
  }
};

export async function getSideloads(): Promise<PlaydateGame[]> {
  const games: PlaydateGame[] = [];
  const response = await fetch("https://play.date/account/", {
    credentials: "include",
  });
  const text = await response.text();

  const dom = DomSelector(text);
  const children = dom.getElementByClassName("game-list").children;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const id = child
      .getElementByClassName("action")
      .attributes["href"].split("#")[1];

    const date = child.getElementByClassName("game-date").text.trim(); // todo: normalize this to ISO8061
    const title = child.getElementByClassName("game-title").text.trim();
    const version = child.getElementByClassName("game-version").text.trim();
    const game: PlaydateGame = {
      id,
      date,
      title,
      version,
    };
    games.push(game);
  }

  return games;
}

export const uploadToPlaydate = async (game: Game): Promise<void> => {
  // upload logic to playdate
  const {setGameStatus} = useItchioStore.getState();

  try {
    let localData = await getGameFromStorage(game.id.toString());

    await uploadGame(`${GAMES_FOLDER}/${localData?.filename}`);

    // Save status locally until new update comes up
    if (localData) {
      localData = {...localData, status: "done"};
      await saveGameToStorage(localData);
    }

    setGameStatus(game, "done");
  } catch (e) {
    setGameStatus(game, "error");
  }
};

export async function uploadGame(path: string): Promise<void> {
  try {
    debugLog("uploading to playdate");
    const token = await getCSRF("https://play.date/account/sideload/");

    const body = new FormData();
    body.append("csrfmiddlewaretoken", token);

    debugLog("getting game file");

    const fileContent = await readFile(path);

    body.append("file", fileContent);

    debugLog("starting fetch");

    const result = await fetch("https://play.date/account/sideload/", {
      method: "POST",
      body,
      headers: {
        Referer: "https://play.date/account/sideload/",
      },
    });

    console.log(result);

    debugLog("finishing fetch upload");
  } catch (e) {
    console.log(e);
  }
}

export const sideLoadPlaydateGames = async (games: Game[]): Promise<string> => {
  try {
    if (games?.length) {
      const promises = games.map(game => uploadToPlaydate(game));
      const results = await Promise.allSettled(promises);
      console.log(results);
    }

    return "success";
  } catch (e) {
    return "error";
  }
};

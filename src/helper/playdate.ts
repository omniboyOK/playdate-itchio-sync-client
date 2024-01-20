import AsyncStorage from "@react-native-async-storage/async-storage";
import DomSelector from "react-native-dom-parser";

export const signInAsync = async (token: string): Promise<void> => {
  await AsyncStorage.setItem("playdateToken", token);
};

export const asyncLogout = async (): Promise<void> => {
  await AsyncStorage.removeItem("playdateToken");
};

async function getCSRF(url: string): Promise<string> {
  const response = await fetch(url);
  const text = await response.text();
  const dom = DomSelector(text);

  const result = dom.getElementsByName("csrfmiddlewaretoken")[0].attributes[
    "value"
  ];

  return result;
}

export const login = async (
  username: string,
  password: string,
): Promise<string | null> => {
  const token = await getCSRF("https://play.date/signin/");

  const body = new URLSearchParams();
  body.append("csrfmiddlewaretoken", token);
  body.append("username", username);
  body.append("password", password);

  const result = await fetch("https://play.date/signin/", {
    body: body.toString(),
    method: "POST",
    headers: {
      Referer: "https://play.date/signin/",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (result.ok) {
    return token;
  }

  return null;
};

interface Game {
  id: string;
  date: string;
  title: string;
  version: string;
}

export async function getSideloads(): Promise<Game[]> {
  const games: Game[] = [];

  const response = await fetch("https://play.date/account/", {
    credentials: "include",
  });
  console.log(response);
  const text = await response.text();

  const dom = DomSelector(text);
  const children = dom.getElementByClassName("game-list").children;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const id = child
      .getElementByClassName("action")
      .attributes["href"].split("#")[1];

    console.log(id);
    const date = child.getElementByClassName("game-date").text.trim(); // todo: normalize this to ISO8061
    const title = child.getElementByClassName("game-title").text.trim();
    const version = child.getElementByClassName("game-version").text.trim();
    const game: Game = {
      id,
      date,
      title,
      version,
    };
    games.push(game);
  }

  return games;
}

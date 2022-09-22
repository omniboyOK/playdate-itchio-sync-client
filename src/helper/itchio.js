import DomSelector from "react-native-dom-parser";
import {fetchItchioTaggedGames} from "../api/itchio";
import {ATTRIBUTES, QUERY} from "../constants/itchio";

export async function login(username, password) {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  params.append("source", "desktop");

  const response = await fetch("https://api.itch.io/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  return response.json();
}

export async function getGames(authorization) {
  const response = await fetch("https://api.itch.io/profile/owned-keys", {
    headers: {
      authorization,
    },
  });
  return response.json();
}

export async function getGameDownloads(game, authorization) {
  const {game_id, id} = game;
  const response = await getGameDownloads(game_id, id, authorization);
  return response.json();
}

export async function getPotentialPlaydateGameNames(page) {
  const response = await fetchItchioTaggedGames(page);
  const {content, num_items} = await response.json();

  if (num_items === 0) {
    return [];
  }

  const dom = DomSelector(content);
  const games = dom.getElementsByClassName(QUERY.GAME_DATA_CLASS);
  console.log(games);
  const processedGames = [];
  for (let i = 0; i < games.length; i++) {
    const gameId = games[i].attributes[[ATTRIBUTES.GAME_ID]];
    const titleElement = games[i].getElementsByClassName(
      QUERY.GAME_TITLE_CLASS,
    );
    const imgElement = games[i].getElementsByClassName(QUERY.GAME_IMAGE_CLASS);
    let game = {
      id: gameId,
      title: titleElement[0].children[0].text,
      img: imgElement[0].attributes[ATTRIBUTES.GAME_IMG] || "",
    };
    processedGames.push(game);
  }
  return processedGames;
}

export async function getAllPotentialPlaydateGameNames() {
  const allNames = new Set();

  let loop = true;
  let page = 8;

  while (loop) {
    const names = await getPotentialPlaydateGameNames(page);
    if (names.length == 0) {
      loop = false;
    }
    names.forEach(name => {
      allNames.add(name);
    });
    page++;
  }
  return [...allNames];
}

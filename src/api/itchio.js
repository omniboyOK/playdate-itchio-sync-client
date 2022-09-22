import {API} from "../constants/itchio";

export async function login(username, password) {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  params.append("source", "desktop");
  const response = await fetch(API.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  console.log(response.json());
  return response.json();
}

export const fetchGameDownloads = async (game_id, id, authorization) =>
  await fetch(
    `https://api.itch.io/games/${game_id}/uploads?download_key_id=${id}`,
    {
      headers: {
        authorization,
      },
    },
  );

export const fetchItchioTaggedGames = async page =>
  await fetch(`https://itch.io/games/tag-playdate?page=${page}&format=json`);
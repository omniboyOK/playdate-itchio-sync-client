import {downloadGame} from "helper/fs";
import {FetchResponse} from "../types/api.types";
import {CredentialsInfo, Game} from "../types/itchio.types";
import {getAuthToken} from "helper/auth";
import {ApiOwnedGamesResponse, ItchioUserResponse} from "./types/itchio.types";

export const fetchItchioTaggedGames = async (
  page: number,
): Promise<Response> => {
  return await fetch(
    `https://itch.io/games/tag-playdate?page=${page}&format=json`,
  );
};

export const fetchApiKey = async (
  token: string,
): Promise<FetchResponse<CredentialsInfo>> => {
  return await fetch(`https://itch.io/api/1/${token}`);
};

export const fetchCredentialsInfo = async (
  token: string,
): Promise<FetchResponse<CredentialsInfo>> => {
  return await fetch(`https://itch.io/api/1/${token}/credentials/info`);
};

export const fetchAccountInfo = async (
  token: string,
): Promise<FetchResponse<ItchioUserResponse>> => {
  return await fetch(`https://itch.io/api/1/${token}/me`);
};

export const fetchOwnedGames = async (
  authorization: string,
): Promise<ApiOwnedGamesResponse> => {
  const response = await fetch("https://api.itch.io/profile/owned-keys", {
    headers: {
      authorization,
    },
  });

  const result = await response.json();

  return result;
};

export const getDownloadSession = async (
  download_key_id: number,
  authorization: string,
): Promise<{uuid: string}> => {
  const response = await fetch(
    `https://api.itch.io/games/${download_key_id}/download-sessions`,
    {
      method: "POST",
      headers: {
        authorization,
      },
    },
  );
  const {uuid} = await response.json();
  return uuid;
};

export const fetchGameDownload = async (game: Game): Promise<void> => {
  console.log("STARTING DOWNLOAD");
  const {download_key, id} = game;
  try {
    const authorization = await getAuthToken();
    console.log("GOT TOKEN");
    // Get game downloads available

    if (!authorization || !download_key) {
      console.log("MISSING PARAMS");
      return;
    }

    const {
      uploads: [upload],
    } = await getGameDownloads(game, authorization);
    console.log("GOT UPLOAD");
    const uuid = await getDownloadSession(download_key, authorization);
    console.log("Got uuid", uuid);
    await downloadGame(
      `https://api.itch.io/uploads/${upload.id}/download?api_key=${authorization}&download_key_id=${id}&uuid=${uuid}`,
      game,
      authorization,
    );
  } catch (e) {
    console.log(e);
  }
};

export async function getGameDownloads(game: Game, authorization: string) {
  const {download_key, id} = game;
  try {
    const response = await fetch(
      `https://api.itch.io/games/${id}/uploads?download_key_id=${download_key}`,
      {
        headers: {
          authorization,
        },
      },
    );

    const result = await response.json();

    console.log("Downloads", result);

    return result;
  } catch (e) {
    console.log(e);
  }
}

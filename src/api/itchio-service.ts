import {downloadGame} from "helper/fs";
import {FetchResponse} from "../types/api.types";
import {CredentialsInfo, Game} from "../types/itchio.types";
import {getAuthToken} from "helper/auth";
import {
  ApiDownloadSessionResponse,
  ApiOwnedGamesResponse,
  ItchioUserResponse,
} from "./types/itchio.types";
import {debugLog} from "helper/debug";

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

export const fetchDownloadSession = async (
  game_id: number,
  authorization: string,
): Promise<ApiDownloadSessionResponse> => {
  const response = await fetch(
    `https://api.itch.io/games/${game_id}/download-sessions`,
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
  debugLog("starting download");
  const {game_id, id} = game;
  try {
    const authorization = await getAuthToken();

    // Get game downloads available
    if (!authorization || !game_id) {
      debugLog("missing params");
      return;
    }

    const {
      uploads: [upload],
    } = await getGameDownloads(game, authorization);

    const uuid = await fetchDownloadSession(game_id, authorization);

    downloadGame(
      `https://api.itch.io/uploads/${upload.id}/download?api_key=${authorization}&download_key_id=${id}&uuid=${uuid}`,
      game,
      upload.filename,
      authorization,
    );
  } catch (e) {
    console.log(e);
  }
};

export async function getGameDownloads(game: Game, authorization: string) {
  const {game_id, id} = game;
  try {
    const response = await fetch(
      `https://api.itch.io/games/${game_id}/uploads?download_key_id=${id}`,
      {
        headers: {
          authorization,
        },
      },
    );

    const result = await response.json();

    return result;
  } catch (e) {
    console.log(e);
  }
}

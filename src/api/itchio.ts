import {FetchResponse} from "../types/api.types";
import {
  CredentialsInfo,
  ItchioUserInfo,
  OwnedGamesResponse,
} from "../types/itchio.types";

export const fetchGameDownloads = async (
  game_id: string,
  id: string,
  authorization: string,
): Promise<Response> => {
  return await fetch(
    `https://api.itch.io/games/${id}/uploads?download_key_id=${game_id}`,
    {
      headers: {
        authorization,
      },
    },
  );
};

export const fetchItchioTaggedGames = async (
  page: number,
): Promise<Response> => {
  return await fetch(
    `https://itch.io/games/tag-playdate?page=${page}&format=json`,
  );
};

export const fetchCredentialsInfo = async (
  token: string,
): Promise<FetchResponse<CredentialsInfo>> => {
  return await fetch(`https://itch.io/api/1/${token}/credentials/info`);
};

export const fetchAccountInfo = async (
  token: string,
): Promise<FetchResponse<ItchioUserInfo>> => {
  return await fetch(`https://itch.io/api/1/${token}/me`);
};

export const fetchOwnedGames = async (
  authorization: string,
): Promise<FetchResponse<OwnedGamesResponse>> => {
  const response = await fetch("https://api.itch.io/profile/owned-keys", {
    headers: {
      authorization,
    },
  });
  const result = await response.json();
  console.log(result);
  return result;
};

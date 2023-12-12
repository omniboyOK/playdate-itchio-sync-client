export const fetchGameDownloads = async (game_id, id, authorization) =>
  await fetch(
    `https://api.itch.io/games/${id}/uploads?download_key_id=${game_id}`,
    {
      headers: {
        authorization,
      },
    },
  );

export const fetchItchioTaggedGames = async page =>
  await fetch(`https://itch.io/games/tag-playdate?page=${page}&format=json`);

export const fetchCredentialsInfo = async token =>
  await fetch(`https://itch.io/api/1/${token}/credentials/info`);

export const fetchOwnedGames = async authorization => {
  const response = await fetch("https://api.itch.io/profile/owned-keys", {
    headers: {
      authorization,
    },
  });
  const result = await response.json();
  console.log(result);
  return result;
};

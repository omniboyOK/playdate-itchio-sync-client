import DomSelector from "react-native-dom-parser";

export async function getPotentialPlaydateGameNames(page = 1) {
  const response = await fetch(
    `https://itch.io/games/tag-playdate?page=${page}&format=json`,
  );
  const {content, num_items} = await response.json();

  if (num_items === 0) {
    return [];
  }

  const dom = DomSelector(content);
  const games = dom.getElementsByClassName("game_cell_data");
  const processedGames = [];
  for (let i = 0; i < games.length; i++) {
    const titleElement = games[i].getElementsByClassName("title");
    // We should filter by Playdate
    processedGames.push(titleElement[0].children[0].text);
  }
  return processedGames;
}

export async function getAllPotentialPlaydateGameNames() {
  const allNames = new Set();

  let loop = true;
  let page = 1;

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
  console.log("NAMES", [...allNames]);
  return [...allNames];
}

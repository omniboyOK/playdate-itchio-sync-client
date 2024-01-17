// Itchio Games query tags for html data scrapping
export const QUERY = {
  GAME_DATA_CLASS: "game_cell" as string,
  GAME_TITLE_CLASS: "title" as string,
  GAME_IMAGE_CLASS: "lazy_loaded" as string,
};

// Itchio Games attributes for html data scrapping
export const ATTRIBUTES = {
  GAME_ID: "data-game_id" as string,
  GAME_IMG: "data-lazy_src" as string,
};
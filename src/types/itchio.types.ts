export interface Game {
  id: number;
  title: string;
  img: string;
  updated_at: string;
  sideloaded?: boolean;
  download_key?: string;
  status?: GameStatus;
}

export type GameStatus =
  | "download"
  | "sideload"
  | "done"
  | "update"
  | "error"
  | undefined;

export interface GameDOMElement {
  attributes: {
    [key: string]: string;
  };
  getElementsByClassName(className: string): Element[];
}

export interface ItchioUserInfo {
  name?: string;
  link?: string;
  image?: string;
}

export interface ItchioUser {}

export interface CredentialsInfo {
  errors?: string[];
  user?: ItchioUserInfo;
}

export interface ItchioGame {
  min_price: number;
  created_at: string;
  id: number;
  published_at: string;
  url: string;
  user: {
    cover_url: string;
    id: number;
    username: string;
    display_name: string;
    url: string;
  };
  cover_url: string;
  traits: string[];
  classification: string;
  title: string;
  short_text: string;
  type: string;
  embed?: {
    fullscreen: boolean;
    width: number;
    height: number;
  };
  sale?: {
    rate: number;
    id: number;
    start_date: string;
    end_date: string;
  };
  still_cover_url?: string;
}

type OwnedGamesUser = {
  id: number;
  url: string;
  display_name: string;
  username: string;
  cover_url: string;
};

export type OwnedGame = {
  user: OwnedGamesUser;
  id: number;
  traits: string[];
  short_text: string;
  title: string;
  cover_url: string;
  published_at: string;
  created_at: string;
  min_price: number;
  classification: string;
  url: string;
  type: string;
};

export interface OwnedKey {
  created_at: string;
  id: number;
  updated_at: string;
  downloads: number;
  game_id: number;
  game: OwnedGame;
  purchase_id?: number;
}

export interface OwnedGamesResponse {
  owned_keys: OwnedKey[];
  page: number;
  per_page: number;
}

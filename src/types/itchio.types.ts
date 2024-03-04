export interface Game {
  id: number;
  title: string;
  img: string;
  updated_at: string;
  sideloaded?: boolean;
  download_key: number;
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

export type OwnedGame = {
  id: number;
  title: string;
  img: string;
  updated_at: string;
  download_key: number;
};



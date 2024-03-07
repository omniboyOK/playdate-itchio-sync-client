export interface Game {
  id: number;
  title: string;
  img: string;
  updated_at: string;
  sideloaded?: boolean;
  game_id: number;
  status: GameStatus;
}

export type GameStatus =
  | "download"
  | "sideload"
  | "done"
  | "update"
  | "error"
  | "not_owned"
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

export interface GameStorageInfo extends Game {
  filename: string;
}

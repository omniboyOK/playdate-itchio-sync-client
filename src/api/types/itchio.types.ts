type OwnedGamesUser = {
  id: number;
  url: string;
  display_name: string;
  username: string;
  cover_url: string;
};

export type ApiOwnedGame = {
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

export interface ApiOwnedKey {
  created_at: string;
  id: number;
  updated_at: string;
  downloads: number;
  game_id: number;
  game: ApiOwnedGame;
  purchase_id?: number;
}

export interface ApiOwnedGamesResponse {
  owned_keys: ApiOwnedKey[];
  page: number;
  per_page: number;
}

export interface ItchioUserResponse {
  user: {
    display_name: string;
    cover_url: string;
    url: string;
  };
}

export interface ApiDownloadSessionResponse {
  uuid: string;
}

export interface ApiItchioGame {
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

export interface ItchioUserInfo {
  username?: string;
  url?: string;
}

export interface CredentialsInfo {
  errors?: string[];
  user?: ItchioUserInfo;
}

export interface Game {
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

export interface OwnedKey {
  created_at: string;
  id: number;
  updated_at: string;
  downloads: number;
  game_id: number;
  game: Game;
  purchase_id?: number;
}

export interface OwnedGamesResponse {
  owned_keys: OwnedKey[];
  page: number;
  per_page: number;
}

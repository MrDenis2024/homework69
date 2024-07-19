export interface Shows {
  id: number;
  name: string;
}

export interface ApiShows {
  [key: string]: Shows;
}

export interface Image {
  medium: string;
}

export interface IShow {
  name: string;
  summary: string;
  language: string;
  premiered: string;
  ended: string;
  genres: [string];
  image: Image | null;
}
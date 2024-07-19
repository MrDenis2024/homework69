export interface Shows {
  id: number;
  name: string;
}

export interface ApiShows {
  [key: string]: Shows;
}
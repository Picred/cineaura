export type FilmType = {
  id: number;
  title: string;
  release_year: number;
  duration: number;
  genre: string;
  description?: string;
  cast: string;
  img: string;
  coverImg?: string;
  rating: number;
};

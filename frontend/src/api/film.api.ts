export type FilmType = {
  id?: number;
  title: string;
  release_year: number;
  duration: number;
  genre: string;
  description: string;
  cast: string;
  img: string;
  rating: number;
};

export const getAllFilms = async (): Promise<FilmType[]> => {
  return fetch("/api/films", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(async (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          return Promise.reject(error.msg || "Error fetching films!");
        });
      }
      return response.json();
    })
    .then((data: FilmType[]) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching films:", error);
      return Promise.reject(error);
    });
};

export const addFilm = async (film: FilmType): Promise<void> => {
  const response = await fetch("/api/films", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(film),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.msg || "Failed to add film");
  }
};

export const editFilm = async (film: FilmType): Promise<void> => {
  if (!film.id) {
    throw new Error("Film ID is required for editing");
  }

  const response = await fetch(`/api/films/${film.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(film),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.msg || "Failed to edit film");
  }
};

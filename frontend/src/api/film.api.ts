import { FilmType } from "../types/FilmType";
import { socket } from "../utils/socket";

export const getAllFilms = async (): Promise<FilmType[]> => {
  return new Promise((resolve, reject) => {
    socket.emit("getAllFilms", (response: any) => {
      if (response.success) {
        resolve(response.films);
      } else {
        reject(response.message || "Error fetching films!");
      }
    });
  });
};

export const addFilm = async (film: FilmType): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket.emit("addFilm", film, (response: any) => {
      if (response.success) {
        resolve();
      } else {
        reject(new Error(response.message || "Failed to add film"));
      }
    });
  });
};

// export const editFilm = async (film: FilmType): Promise<void> => {
//   if (!film.id) {
//     throw new Error("Film ID is required for editing");
//   }

//   const response = await fetch(`/api/films/${film.id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(film),
//   });

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     throw new Error(errorResponse.msg || "Failed to edit film");
//   }
// };

// export const getFilmById = async (id: number): Promise<FilmType> => {
//   return await fetch(`/api/films/${id}`, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   })
//     .then(async (response) => {
//       if (!response.ok) {
//         return response.json().then((error) => {
//           return Promise.reject(error.msg || "Error fetching film!");
//         });
//       }
//       return response.json();
//     })
//     .then((data: FilmType) => {
//       return data;
//     })
//     .catch((error) => {
//       console.error("Error fetching film:", error);
//       return Promise.reject(error);
//     });
// };

export const getFilmById = async (id: number): Promise<FilmType> => {
  return new Promise((resolve, reject) => {
    socket.emit("getFilmById", id, (response: any) => {
      if (response.success) {
        resolve(response.film);
      } else {
        reject(new Error(response.message || "Error fetching film!"));
      }
    });
  });
};

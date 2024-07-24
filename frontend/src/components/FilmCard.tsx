import { useEffect, useState } from "react";
import { FilmType, getAllFilms } from "../api/film.api";

const FilmCard = ({
  title,
  release_year,
  duration,
  genre,
  description,
  cast,
  img,
  rating,
}: FilmType) => {
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img src={img} alt="Film Image" className="w-60" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>Release year : {release_year}</p>
          <p>Duration : {duration}</p>
          <p>Genre : {genre}</p>
          <p>Description : {description}</p>
          <p>Cast : {cast}</p>
          <p>Rating : {rating}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmCard;

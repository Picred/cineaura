type FilmProps = {
  title: string;
  image: string;
  url: string;
  trailerURL: string;
};

type TopFilmsProps = {
  media: FilmProps[];
};

const TopFilms = ({ topFilms }: { topFilms: TopFilmsProps }) => {
  return (
    <>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://i0.wp.com/theroughcutpod.com/wp-content/uploads/2023/01/Avatar_Twitter.jpeg?fit=1200%2C628&quality=89&ssl=1"
            className="w-full "
            height="100px"
          />
          <div className="absolute leftright-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopFilms;

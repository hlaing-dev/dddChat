import { Link, useNavigate } from "react-router-dom";
import he from "he";
// import videoIcon from "../../assets/videoIcon.svg";
import LazyLoadImage from "../../../components/home/LazyLoadImage";

const MovieCard = ({
  movie,
  height = "165px",
  width = "114px",
  showRecommandMovie,
}) => {
  const showMovie = () => {
    // navigate(`/player/${movie?.id}`);
    showRecommandMovie(movie?.id);
  };
  return (
    <div className="movie-item max-sm:h-auto cursor-default relative mt-2">
      <div
        className={`block relative zoom-effect`}
        onClick={() => showMovie(movie?.id)}
      >
        <div className={`img_a relative  w-full border-none`}>
          <LazyLoadImage
            src={movie.cover}
            alt={movie.name}
            className={`movie_img rounded-[4px] border-none  cursor-default object-cover w-full`}
          />
          <div className="absolute rounded-[4px]  h-full w-full inset-0 bg-gradient-to-b from-transparent via-black/5 to-black"></div>
          <div className="flex absolute text-[10px] justify-between items-center px-3 bottom-2 w-full">
            <p className="flex-1 truncate text-white">{movie?.dynamic}</p>
            <p className="flex-1 flex justify-end text-white">
              {movie?.type_name}
            </p>
          </div>
        </div>

        <div className="overlay">
          {/* <img className="h-[40px]" src={videoIcon} alt="" /> */}
        </div>
        {movie?.label?.length ? (
          <div className="absolute top-0 right-0 search_card_score z-10">
            <p className="truncate text-center">{movie?.label}</p>
          </div>
        ) : (
          <></>
        )}
        {/* <div className="top-0 right-0 search_card_score truncate z-1 absolute w-[40px] flex justify-center items-center">
        <span>{movie?.label}</span>
      </div> */}
      </div>

      <div className="text-container">
        <div className="movie-info">
          <h2
            className={`text-[12px] mt-[.14rem] leading-[18px] font-confortFont font-[400] text-black truncate`}
          >
            {he.decode(movie?.name || "Unknown Title")}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
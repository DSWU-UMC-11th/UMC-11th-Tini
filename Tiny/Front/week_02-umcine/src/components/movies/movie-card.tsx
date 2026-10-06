import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <article>
      <div className="relative">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          <img
            className="aspect-2/3 w-full rounded-lg object-cover"
            src={movie.posterPath}
            alt={movie.title}
          />
        </Link>
        <BookmarkButton movieId={movie.id} className="absolute right-2 top-2" />
      </div>
      <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
        <h2 className="mt-2 text-base font-medium">{movie.title}</h2>
      </Link>
      <p className="text-[13px] text-gray-500">{movie.releaseDate}</p>
    </article>
  );
}

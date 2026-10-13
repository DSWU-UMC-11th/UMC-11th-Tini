import { Link } from "@tanstack/react-router";
import type { MovieCardItem } from "../../types/movie";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: MovieCardItem;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <article>
      <div className="relative">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          {movie.posterUrl ? (
            <img
              className="aspect-2/3 w-full rounded-lg object-cover"
              src={movie.posterUrl}
              alt={movie.title}
            />
          ) : (
            <div className="flex aspect-2/3 w-full items-center justify-center rounded-lg bg-gray-200 text-sm text-gray-500">
              이미지 없음
            </div>
          )}
        </Link>
        <BookmarkButton movieId={movie.id} className="absolute right-2 top-2" />
      </div>
      <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
        <h2 className="mt-2 text-sm font-semibold">{movie.title}</h2>
      </Link>
      <p className="mt-0.5 text-xs text-gray-400">{movie.releaseDateText}</p>
    </article>
  );
}

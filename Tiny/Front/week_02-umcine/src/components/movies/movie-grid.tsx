import type { Movie } from "../../types/movie";
import type { CardSize } from "../../stores/view-settings-store";
import { cn } from "../../utils/cn";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: Movie[];
  cardSize?: CardSize;
}

export default function MovieGrid({
  movies,
  cardSize = "large",
}: MovieGridProps) {
  return (
    <section
      className={cn(
        "grid gap-6",
        cardSize === "small"
          ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
      )}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}

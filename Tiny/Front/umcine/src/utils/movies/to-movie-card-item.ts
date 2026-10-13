import type { TmdbMovieListItem } from "../../api/movies/models";
import type { MovieCardItem } from "../../types/movie";
import { formatReleaseDate } from "./format-movie";
import { getTmdbPosterUrl } from "./tmdb-image";

export function toMovieCardItem(movie: TmdbMovieListItem): MovieCardItem {
  return {
    id: movie.id,
    title: movie.title,
    posterUrl: getTmdbPosterUrl(movie.poster_path),
    releaseDateText: formatReleaseDate(movie.release_date),
  };
}

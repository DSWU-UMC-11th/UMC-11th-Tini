import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { useBookmarkStore } from "../../stores/bookmark-store";
import {
  formatReleaseDate,
  formatRuntime,
} from "../../utils/movies/format-movie";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";
import { ErrorState } from "../../components/common/error-state";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Hook은 early return보다 위에 있어야 해요
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(parsedMovieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  useEffect(() => {
    let ignore = false;

    setMovie(null);
    setErrorMessage(null);

    if (!isValidMovieId) {
      setIsLoading(false);
      return;
    }

    async function loadMovieDetail() {
      setIsLoading(true);

      try {
        const response = await getMovieDetail(parsedMovieId);
        if (!ignore) setMovie(response);
      } catch (error) {
        if (!ignore) setErrorMessage(getMovieDetailErrorMessage(error));
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovieDetail();

    return () => {
      ignore = true;
    };
  }, [parsedMovieId, isValidMovieId, retryCount]);

  if (!isValidMovieId) {
    return (
      <main className="px-4 py-8 sm:px-10">올바르지 않은 영화 번호예요.</main>
    );
  }
  if (isLoading) {
    return (
      <main className="px-4 py-8 text-gray-500 sm:px-10">
        영화 정보를 불러오는 중이에요.
      </main>
    );
  }
  if (errorMessage) {
    return (
      <main className="px-4 py-8 sm:px-10">
        <ErrorState
          message={errorMessage}
          onRetry={() => setRetryCount((count) => count + 1)}
        />
      </main>
    );
  }
  if (!movie) {
    return <main className="px-4 py-8 sm:px-10">영화를 찾을 수 없어요.</main>;
  }

  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const genreText = movie.genres.map((genre) => genre.name).join(" · ");

  return (
    <main>
      <div className="relative h-100 w-full">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-300 text-gray-500">
            이미지 없음
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute inset-0">
          <div className="flex h-full flex-col justify-between px-4 py-6 text-white sm:px-10">
            <Link
              to="/"
              className="flex w-fit items-center gap-1 text-sm font-semibold"
            >
              <img
                src="/icons/chevron-left.svg"
                alt=""
                className="h-4 w-4 invert"
              />
              영화 목록
            </Link>

            <div className="pb-2">
              <h1 className="text-4xl font-bold">{movie.title}</h1>
              <p className="mt-2 text-sm text-gray-200">
                {movie.original_title}
              </p>
              <p className="mt-1 flex flex-wrap gap-x-3 text-sm font-semibold">
                <span>{formatReleaseDate(movie.release_date)}</span>
                {genreText && <span>{genreText}</span>}
                <span>{formatRuntime(movie.runtime)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-8 px-4 py-6 sm:px-10">
        <div className="w-44 shrink-0">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} 포스터`}
              className="w-full rounded-lg object-cover shadow-lg"
            />
          ) : (
            <div className="flex aspect-2/3 w-full items-center justify-center rounded-lg bg-gray-200 text-sm text-gray-500 shadow-lg">
              이미지 없음
            </div>
          )}
        </div>

        <div className="flex-1">
          {movie.tagline && (
            <h2 className="text-xl font-bold">{movie.tagline}</h2>
          )}
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            {movie.overview || "줄거리 정보가 없어요."}
          </p>
          <button
            type="button"
            onClick={() => toggleBookmark(movie.id)}
            className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
          >
            <img
              src={
                isBookmarked
                  ? "/icons/bookmark.svg"
                  : "/icons/bookmark-outline.svg"
              }
              alt=""
              className="h-4 w-4 brightness-0 invert"
            />
            {isBookmarked ? "즐겨찾기 해제" : "즐겨찾기"}
          </button>
        </div>
      </div>
    </main>
  );
}

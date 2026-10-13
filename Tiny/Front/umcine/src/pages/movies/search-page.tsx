import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { searchMovies } from "../../api/movies/search-movies";
import { formatReleaseDate } from "../../utils/movies/format-movie";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { ErrorState } from "../../components/common/error-state";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");
  const [prevQuery, setPrevQuery] = useState(query);

  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  if (query !== prevQuery) {
    setPrevQuery(query);
    setSearchText(query ?? "");
  }

  const normalizedQuery = query?.trim() ?? "";

  useEffect(() => {
    let ignore = false;

    setMovies([]);
    setTotalResults(0);
    setErrorMessage(null);

    if (!normalizedQuery) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    searchMovies({ query: normalizedQuery })
      .then((response) => {
        if (ignore) return;
        setMovies(response.results);
        setTotalResults(response.total_results);
        setCurrentPage(response.page);
      })
      .catch(() => {
        if (!ignore) setErrorMessage("검색 결과를 불러오지 못했어요.");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [normalizedQuery, retryCount]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  function renderResults() {
    if (isLoading) {
      return (
        <p className="py-20 text-center text-gray-500">
          검색 결과를 불러오는 중이에요.
        </p>
      );
    }
    if (errorMessage) {
      return (
        <ErrorState
          message={errorMessage}
          onRetry={() => setRetryCount((count) => count + 1)}
        />
      );
    }
    if (movies.length === 0) {
      return (
        <p className="py-20 text-center text-gray-500">검색 결과가 없어요.</p>
      );
    }
    return (
      <ul className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
        {movies.map((movie) => {
          const posterUrl = getTmdbPosterUrl(movie.poster_path);

          return (
            <li
              key={movie.id}
              className="flex gap-5 border-b border-gray-200 pb-6"
            >
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={`${movie.title} 포스터`}
                  className="h-40 w-28 shrink-0 rounded-md object-cover"
                />
              ) : (
                <div className="flex h-40 w-28 shrink-0 items-center justify-center rounded-md bg-gray-200 text-xs text-gray-500">
                  이미지 없음
                </div>
              )}
              <div className="flex flex-1 flex-col">
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="mt-1 flex flex-wrap gap-x-2 text-xs text-gray-400">
                  <span>{movie.original_title}</span>
                  <span>{formatReleaseDate(movie.release_date)}</span>
                </p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-600">
                  {movie.overview || "줄거리 정보가 없어요."}
                </p>
                <Link
                  to="/movies/$movieId"
                  params={{ movieId: String(movie.id) }}
                  className="mt-3 w-fit text-xs font-semibold text-blue-600"
                >
                  상세 보기 →
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <main className="px-4 py-8 sm:px-10">
      {!normalizedQuery ? (
        <div className="flex flex-col items-center pt-32 text-center">
          <h1 className="mb-8 text-4xl font-bold">어떤 영화를 찾고 있나요?</h1>
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-175 items-center gap-3 rounded-xl border-2 border-black bg-white py-2 pl-5 pr-2 shadow-lg"
          >
            <img src="/icons/search.svg" alt="" className="h-5 w-5" />
            <input
              aria-label="검색어"
              placeholder="예: 스파이더맨"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              className="flex-1 bg-transparent py-2 outline-none"
            />
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
            >
              검색
            </button>
          </form>
        </div>
      ) : (
        <>
          <h1 className="mb-6 text-3xl font-bold">영화 검색</h1>
          <form
            onSubmit={handleSubmit}
            className="mb-6 flex items-center gap-3 rounded-lg border border-gray-200 bg-white py-2 pl-5 pr-2"
          >
            <img src="/icons/search.svg" alt="" className="h-5 w-5" />
            <input
              aria-label="검색어"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              className="flex-1 bg-transparent py-1.5 text-sm outline-none"
            />
            {searchText && (
              <button
                type="button"
                onClick={() => setSearchText("")}
                className="cursor-pointer p-1"
              >
                <img src="/icons/close.svg" alt="지우기" className="h-4 w-4" />
              </button>
            )}
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-black px-4 py-2 text-sm font-semibold text-white"
            >
              다시 검색
            </button>
          </form>

          <div className="mb-6 flex items-baseline justify-between border-b border-gray-200 pb-4">
            <h2 className="text-lg font-bold">‘{normalizedQuery}’ 검색 결과</h2>
            {!isLoading && !errorMessage && (
              <p className="text-xs text-gray-400">
                영화 {totalResults}편 · {currentPage}페이지
              </p>
            )}
          </div>

          {renderResults()}
        </>
      )}
    </main>
  );
}

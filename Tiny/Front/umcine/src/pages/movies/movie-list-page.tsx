import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { MovieCardItem } from "../../types/movie";
import { toMovieCardItem } from "../../utils/movies/to-movie-card-item";
import { ErrorState } from "../../components/common/error-state";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import {
  useViewSettingsStore,
  type CardSize,
} from "../../stores/view-settings-store";
import { cn } from "../../utils/cn";

const CARD_SIZE_OPTIONS: { value: CardSize; label: string }[] = [
  { value: "large", label: "크게" },
  { value: "small", label: "작게" },
];

const TMDB_MAX_PAGE = 500;

export function MovieListPage() {
  const { page = 1 } = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });

  const cardSize = useViewSettingsStore((state) => state.cardSize);
  const setCardSize = useViewSettingsStore((state) => state.setCardSize);

  const [movies, setMovies] = useState<MovieCardItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadMovies() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getMovies({ page });
        if (ignore) return;
        setMovies(response.results.map(toMovieCardItem));
        setTotalPages(Math.min(response.total_pages, TMDB_MAX_PAGE));
      } catch {
        if (!ignore) setErrorMessage("영화 목록을 불러오지 못했어요.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, [page, retryCount]);

  function handlePageChange(nextPage: number) {
    navigate({ search: nextPage === 1 ? {} : { page: nextPage } });
    window.scrollTo({ top: 0 });
  }

  function renderContent() {
    if (isLoading) {
      return (
        <p className="py-20 text-center text-gray-500">
          영화 목록을 불러오는 중이에요.
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
        <p className="py-20 text-center text-gray-500">
          조건에 맞는 영화가 없어요.
        </p>
      );
    }
    return (
      <>
        <MovieGrid movies={movies} cardSize={cardSize} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    );
  }

  return (
    <main className="px-4 py-8 sm:px-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">영화 목록</h1>
        <div className="flex gap-1 rounded-md border border-gray-300 p-1">
          {CARD_SIZE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={cardSize === option.value}
              onClick={() => setCardSize(option.value)}
              className={cn(
                "cursor-pointer rounded px-3 py-1 text-sm",
                cardSize === option.value
                  ? "bg-black font-semibold text-white"
                  : "text-gray-600",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {renderContent()}
    </main>
  );
}

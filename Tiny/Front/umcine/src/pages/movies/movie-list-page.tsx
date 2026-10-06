import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies } from "../../data/movies";
import {
  useViewSettingsStore,
  type CardSize,
} from "../../stores/view-settings-store";
import { cn } from "../../utils/cn";

const CARD_SIZE_OPTIONS: { value: CardSize; label: string }[] = [
  { value: "large", label: "크게" },
  { value: "small", label: "작게" },
];

export function MovieListPage() {
  const cardSize = useViewSettingsStore((state) => state.cardSize);
  const setCardSize = useViewSettingsStore((state) => state.setCardSize);

  return (
    <main className="mx-auto max-w-300 px-4 py-8 sm:px-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">영화 목록</h1>
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
      <MovieGrid movies={movies} cardSize={cardSize} />
      <Pagination />
    </main>
  );
}

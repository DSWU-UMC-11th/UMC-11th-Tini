import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";
import { useBookmarkStore } from "../../stores/bookmark-store";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  // Hook은 early return보다 위에 있어야 해요
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(Number(movieId)),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  if (!movie) {
    return <main className="px-10 py-8">영화를 찾을 수 없어요.</main>;
  }

  return (
    <main>
      <div className="relative h-100 w-full">
        <img
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        <Link
          to="/"
          className="absolute left-10 top-6 flex items-center gap-1 text-sm text-white"
        >
          <img
            src="/icons/chevron-left.svg"
            alt=""
            className="h-4 w-4 invert"
          />
          영화 목록
        </Link>

        <div className="absolute bottom-8 left-10 text-white">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="mt-1 text-gray-200">{movie.originalTitle}</p>
          <p className="mt-2 text-sm font-semibold">
            {movie.releaseDate} · {movie.genres.join(" · ")} · {movie.runtime}
          </p>
        </div>
      </div>

      <div className="flex max-w-300 gap-8 bg-gray-50 px-10 py-10">
        <div className="w-44 shrink-0">
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="w-full rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={() => toggleBookmark(movie.id)}
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-600 py-2.5 font-semibold text-white"
          >
            <img
              src={
                isBookmarked
                  ? "/icons/bookmark.svg"
                  : "/icons/bookmark-outline.svg"
              }
              alt=""
              className="h-4 w-4"
            />
            {isBookmarked ? "즐겨찾기 해제" : "즐겨찾기"}
          </button>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold">{movie.tagline}</h2>
          <p className="mt-3 leading-relaxed text-gray-700">{movie.overview}</p>
        </div>
      </div>
    </main>
  );
}

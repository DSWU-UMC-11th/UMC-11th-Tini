import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { BookmarkButton } from "../../components/bookmark-button";
import { movies } from "../../data/movies";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");
  const [prevQuery, setPrevQuery] = useState(query);

  if (query !== prevQuery) {
    setPrevQuery(query);
    setSearchText(query ?? "");
  }

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main className="mx-auto max-w-250 px-10 py-8">
      {!normalizedQuery ? (
        <div className="flex flex-col items-center pt-24 text-center">
          <h1 className="mb-8 text-3xl font-bold">어떤 영화를 찾고 있나요?</h1>
          <form onSubmit={handleSubmit} className="flex w-full max-w-175 gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-md border border-black px-4 py-3">
              <img src="/icons/search.svg" alt="" className="h-4 w-4" />
              <input
                aria-label="검색어"
                placeholder="예: 스파이더맨"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                className="flex-1 outline-none"
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-black px-6 py-3 font-semibold text-white"
            >
              검색
            </button>
          </form>
        </div>
      ) : (
        <>
          <h1 className="mb-6 text-2xl font-bold">영화 검색</h1>
          <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-md border border-gray-300 px-4 py-2.5">
              <img src="/icons/search.svg" alt="" className="h-4 w-4" />
              <input
                aria-label="검색어"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                className="flex-1 outline-none"
              />
              {searchText && (
                <button type="button" onClick={() => setSearchText("")}>
                  <img
                    src="/icons/close.svg"
                    alt="지우기"
                    className="h-4 w-4"
                  />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-black px-6 py-2.5 font-semibold text-white"
            >
              다시 검색
            </button>
          </form>

          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-lg font-bold">‘{query}’ 검색 결과</h2>
            <p className="text-sm text-gray-500">
              영화 {searchResults.length}편
            </p>
          </div>

          {searchResults.length === 0 ? (
            <p className="text-gray-500">검색 결과가 없어요.</p>
          ) : (
            <ul className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
              {searchResults.map((movie) => (
                <li
                  key={movie.id}
                  className="flex gap-4 border-b border-gray-200 pb-6"
                >
                  <img
                    src={movie.posterPath}
                    alt={`${movie.title} 포스터`}
                    className="h-40 w-28 rounded-md object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <h3 className="font-bold">{movie.title}</h3>
                    <p className="text-sm text-gray-500">
                      {movie.originalTitle} · {movie.releaseDate}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {movie.overview}
                    </p>
                    <div className="mt-2">
                      <BookmarkButton
                        movieId={movie.id}
                        className="border border-gray-300"
                      />
                    </div>
                    <Link
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                      className="mt-auto pt-2 text-sm font-semibold text-blue-600"
                    >
                      상세 보기 →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}

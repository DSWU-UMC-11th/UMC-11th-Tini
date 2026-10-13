import { createFileRoute } from "@tanstack/react-router";
import { MovieListPage } from "../pages/movies/movie-list-page";

const TMDB_MAX_PAGE = 500;

export const Route = createFileRoute("/")({
  validateSearch: (search): { page?: number } => {
    const page = Number(search.page);
    if (!Number.isInteger(page) || page < 1) return {};
    return { page: Math.min(page, TMDB_MAX_PAGE) };
  },
  component: MovieListPage,
});

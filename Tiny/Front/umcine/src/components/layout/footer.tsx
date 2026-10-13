export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="flex items-center justify-end gap-2 px-4 py-5 text-xs text-gray-500 sm:px-10">
        <img src="/icons/tmdb-logo.svg" alt="TMDB" className="h-2.5" />
        <p>
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            TMDB
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

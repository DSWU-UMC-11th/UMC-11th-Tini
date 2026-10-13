interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-red-500">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="cursor-pointer rounded-md bg-black px-4 py-2 text-sm font-semibold text-white"
      >
        다시 시도
      </button>
    </div>
  );
}

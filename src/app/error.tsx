'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="p-4 text-center bg-red space-y-5 pt-20">
      <h1 className="text-2xl">Something went wrong</h1>
      <p className="text-5xl font-bold">{error.message}</p>
      <button
        onClick={() => reset()}
        className="text-blue-500 cursor-pointer hover:underline text-xl mt-6"
      >
        Try again
      </button>
    </main>
  );
}

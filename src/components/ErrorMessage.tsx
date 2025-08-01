import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

type Props = {
  error: FetchBaseQueryError | SerializedError | undefined;
};

export default function ErrorMessage({ error }: Props) {
  const fallback = 'Something went wrong. Please try again later.';

  if (!error) {
    return (
      <div className="w-full flex justify-center items-center h-full px-4 py-3 text-red-600 bg-red-100 rounded-md">
        {fallback}
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center h-full px-4 py-3 text-red-600 bg-red-100 rounded-md">
      {isFetchBaseQueryError(error) ? (
        <p className="text-center">
          <strong>Error {error.status}:</strong>{' '}
          {typeof error.data === 'string'
            ? error.data
            : error.data && typeof error.data === 'object'
              ? JSON.stringify(error.data)
              : fallback}
        </p>
      ) : (
        <p className="text-center">
          <strong>Error:</strong> {fallback}
        </p>
      )}
    </div>
  );
}

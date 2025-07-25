export default function Pagination({
  page,
  setPage,
  total,
  limit,
}: {
  page: number;
  setPage: (p: number) => void;
  total: number;
  limit: number;
}) {
  const totalPages = Math.ceil(total / limit);

  const clsForButton =
    'px-5 py-1 border rounded-2xl hover:cursor-pointer bg-amber-300 hover:bg-amber-400 transition-all disabled:bg-gray-300 disabled:border-gray-200 disabled:text-gray-400';
  return (
    <div className="flex gap-2 justify-center items-center">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={clsForButton}
      >
        Prev
      </button>
      <span>
        {page} of {totalPages}
      </span>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className={clsForButton}
      >
        Next
      </button>
    </div>
  );
}

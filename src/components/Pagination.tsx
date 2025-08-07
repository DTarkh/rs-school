export default function Pagination({
  page,
  total,
  limit,
}: {
  page: number;
  total: number;
  limit: number;
}) {
  const totalPages = Math.ceil(total / limit);

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(location.search);
    params.set('page', String(newPage));
    // navigate({ pathname: location.pathname, search: params.toString() });
  };

  const clsForButton =
    'px-5 py-1 border rounded-2xl hover:cursor-pointer bg-amber-300 hover:bg-amber-400 transition-all disabled:bg-gray-300 disabled:border-gray-200 disabled:text-gray-400';

  return (
    <div className="flex gap-2 justify-center items-center">
      <button
        onClick={() => changePage(page - 1)}
        disabled={page === 1}
        className={clsForButton}
      >
        Prev
      </button>
      <span>
        {page} of {totalPages}
      </span>
      <button
        onClick={() => changePage(page + 1)}
        disabled={page === totalPages}
        className={clsForButton}
      >
        Next
      </button>
    </div>
  );
}

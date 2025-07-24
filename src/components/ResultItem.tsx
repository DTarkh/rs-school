import { Link } from 'react-router-dom';

export default function ResultsItem({
  id,
  title,
  image,
}: {
  id: number;
  title: string;
  image: string;
}) {
  return (
    <div className="flex items-center space-x-4 bg-white rounded-lg shadow-sm border hover:bg-gray-100  p-4">
      <img
        src={image}
        alt={title}
        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
      />
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <Link
          to={`/product/${id}`}
          className="hover:text-fuchsia-600 transition-all"
        >
          See Details{' '}
        </Link>
      </div>
    </div>
  );
}

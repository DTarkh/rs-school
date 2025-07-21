import { Link } from 'react-router-dom';

export default function ResultsList({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <Link
      to={`/products/`}
      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-4 group"
    >
      <div className="flex items-start space-x-4">
        <img
          src={image}
          alt={title}
          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
            Title: {title.slice(0, 20)}
          </h3>
          <p className="text-sm text-gray-500 mt-1 capitalize">Catregory</p>
          <div className="flex items-center mt-2 space-x-4">
            <span className="text-lg font-bold text-gray-900">$Price</span>
            <div className="flex items-center text-sm text-gray-500">
              Rating / Count
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

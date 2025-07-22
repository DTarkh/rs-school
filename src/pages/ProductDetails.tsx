import { useNavigate, useParams } from 'react-router-dom';

export default function ProductDetails() {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Products
      </button>
      ProductDetails {params.id}
    </div>
  );
}

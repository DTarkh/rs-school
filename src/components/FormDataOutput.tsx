import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export default function FormDataOutput() {
  const { formData, image } = useSelector((state: RootState) => state.formData);

  if (formData.name !== '')
    return (
      <div className="p-6  bg-gray-500 mt-10 rounded-2xl">
        <h2 className="font-bold text-center text-amber-50">Form Data</h2>
        <div className="flex gap-5 mt-3">
          <ul className="list-disc pl-5">
            {Object.entries(formData).map(([key, value]) => (
              <li key={key} className="text-amber-50">
                {key}: {String(value)}
              </li>
            ))}
          </ul>

          <img
            src={
              image ? `data:${image.mime};base64,${image.base64}` : undefined
            }
            alt="Uploaded"
            className="mt-2 w-32 h-32 object-cover rounded border"
          />
        </div>
      </div>
    );
}

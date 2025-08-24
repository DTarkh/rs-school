import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const capitalizeKey = (key: string): string => {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
};

export default function FormDataOutput() {
  const { formData, image } = useSelector((state: RootState) => state.formData);

  if (formData.name !== '')
    return (
      <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 mt-10 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6 pb-3 border-b border-slate-300">
          Form Data Summary
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 min-w-0">
            <div className="space-y-3">
              {Object.entries(formData).map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <span className="font-semibold text-slate-700 min-w-fit">
                    {capitalizeKey(key)}:
                  </span>
                  <span className="text-slate-600 font-medium break-words">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {image && (
            <div className="flex-shrink-0">
              <div className="p-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <img
                  src={`data:${image.mime};base64,${image.base64}`}
                  alt="Uploaded preview"
                  className="w-40 h-40 object-cover rounded-xl border border-slate-100"
                />
                <p className="text-xs text-slate-500 text-center mt-2 font-medium">
                  Uploaded Image
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

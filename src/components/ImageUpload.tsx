import { useEffect, useRef, useState } from 'react';

type Props = {
  name?: string;
  maxSizeMB?: number;
  resetTrigger?: boolean;
  onSelect: (file: File | null) => void;
};

const allowedMimes = ['image/png', 'image/jpeg'];
const allowedExts = ['.png', '.jpg', '.jpeg'];

export function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1] || '');
    };
    reader.readAsDataURL(file);
  });
}

export default function ImageUpload({
  name = 'avatar',
  maxSizeMB = 2,
  resetTrigger,
  onSelect,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = '';
    setError(null);
    setPreview(null);
    onSelect(null);
  }, [resetTrigger, onSelect]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    setPreview(null);

    const file = e.target.files?.[0];
    if (!file) return;

    const lowerName = file.name.toLowerCase();

    if (!allowedExts.some((ext) => lowerName.endsWith(ext))) {
      setError('Only .png, .jpg, .jpeg files are allowed');
      return;
    }

    if (!allowedMimes.includes(file.type)) {
      setError('Invalid type: only PNG or JPEG allowed');
      return;
    }

    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`File too large. Max ${maxSizeMB} MB`);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    onSelect(file);
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Upload Picture
      </label>
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/png,image/jpeg"
        onChange={handleChange}
        className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 
                   file:px-3 file:py-2 file:text-white hover:file:bg-blue-700"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="h-20 w-20 object-cover rounded border"
        />
      )}
    </div>
  );
}

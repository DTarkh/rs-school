import { useCallback, useRef, useState } from 'react';
import ImageUpload, { toBase64 } from './ImageUpload';
import { FormActions } from '../store/formDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FormSchema } from '../schema/uncontrolledFormSchema';
import type { RootState } from '../store';

export default function UncontrolledForm({
  setOpen,
}: {
  setOpen: (val: boolean) => void;
}) {
  const countries = useSelector(
    (state: RootState) => state.formData.formData.country
  );

  const nameRef = useRef<HTMLInputElement | null>(null);
  const [reset, setReset] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const dispatch = useDispatch();

  const handleImageSelect = useCallback((file: File | null) => {
    setImageFile(file);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormErrors([]);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get('name') || ''),
      age: Number(fd.get('age')),
      email: String(fd.get('email') || ''),
      password: String(fd.get('password') || ''),
      confirmPassword: String(fd.get('confirmPassword') || ''),
      gender: String(fd.get('gender') || ''),
      country: String(fd.get('country') || '') as
        | 'Kazakhstan'
        | 'Georgia'
        | 'England',
      terms: fd.get('terms') !== null,
      image: imageFile as File,
    };

    const result = FormSchema.safeParse(payload);

    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message);
      setFormErrors(messages);

      const firstKey = result.error.issues[0]?.path[0];
      if (typeof firstKey === 'string') {
        const el = form.querySelector(
          `[name="${firstKey}"]`
        ) as HTMLElement | null;
        el?.focus();
      }
      return;
    }

    const {
      name,
      age: ageStr,
      email,
      password,
      confirmPassword: confirm,
      gender,
      country,
      terms,
    } = result.data;

    dispatch(
      FormActions.Add({
        name,
        age: ageStr,
        email,
        password,
        confirmPassword: confirm,
        gender,
        country,
        terms,
      })
    );

    console.log('Form OK:', {
      name,
      age: ageStr,
      email,
      password,
      confirm,
      gender,
      country,
      terms,
    });

    let imagePayload = null;
    if (imageFile) {
      const base64 = await toBase64(imageFile);
      imagePayload = {
        base64,
        mime: imageFile.type,
        name: imageFile.name,
        size: imageFile.size,
      };
    }

    dispatch(FormActions.setImage(imagePayload));

    form.reset();
    nameRef.current?.focus();
    setReset((r) => !r);
    setOpen(false);
  }

  return (
    <div className="flex justify-center items-start p-6 bg-gray-100 gap-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            ref={nameRef}
            type="text"
            name="name"
            id="name"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="age"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="gender"
              value="male"
              className="accent-blue-500"
            />
            Male
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="gender"
              value="female"
              className="accent-pink-500"
            />
            Female
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="terms"
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
          <span>I accept the terms and conditions</span>
        </label>
        <ImageUpload resetTrigger={reset} onSelect={handleImageSelect} />

        <div className="flex flex-col">
          <label
            htmlFor="country"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <select
            id="country"
            name="country"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value=""></option>
            {(Array.isArray(countries) ? countries : [countries]).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="w-full flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setReset((r) => !r);
              setOpen(false);
            }}
            className="px-4 py-1 bg-amber-400 text-amber-50 rounded"
          >
            Close
          </button>
          <button
            type="submit"
            className="px-4 py-1 text-amber-50 rounded bg-fuchsia-700"
          >
            Submit
          </button>
        </div>
      </form>
      {formErrors.length > 0 && (
        <div
          className="bg-red-50 border border-red-300 text-red-700 rounded p-3"
          role="alert"
          aria-live="assertive"
        >
          <p className="font-semibold mb-2">Please fix the following errors:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {formErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

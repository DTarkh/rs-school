import { useRef, useState } from 'react';
import ImageUpload from './ImageUpload';

export default function UncontrolledForm({
  setOpen,
}: {
  setOpen: (val: boolean) => void;
}) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [reset, setReset] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get('name') || '');
    const ageStr = String(fd.get('age') || '');
    const email = String(fd.get('email') || '');
    const password = String(fd.get('password') || '');
    const confirm = String(fd.get('confirm-password') || '');
    const gender = String(fd.get('gender') || '');
    const country = String(fd.get('country') || '');
    const termsChecked = fd.get('terms') !== null;

    const nextErrors: string[] = [];

    if (!name) nextErrors.push('Name is required');
    else if (!/^[A-Z]/.test(name))
      nextErrors.push('First letter of Name must be capital');

    if (!ageStr) nextErrors.push('Age is required');
    else {
      const age = Number(ageStr);
      if (Number.isNaN(age)) nextErrors.push('Age must be a number');
      else if (age <= 0) nextErrors.push('Age must be greater than 0');
    }

    if (!email) nextErrors.push('Email is required');
    else if (!/.+@.+\..+/.test(email)) nextErrors.push('Email is not valid');

    if (!password) nextErrors.push('Password is required');
    if (!confirm) nextErrors.push('Confirm Password is required');
    if (password && confirm && password !== confirm)
      nextErrors.push('Passwords do not match');

    if (password && !/\d/.test(password))
      nextErrors.push('Password must have least one number');

    if (password && !/[A-Z]/.test(password))
      nextErrors.push('Password must have least one Uppercase');

    if (password && !/[a-z]/.test(password))
      nextErrors.push('Password must have  least one Lowercase');

    if (password && !/[!@#$%^&*(),.?":{}|<>]/.test(password))
      nextErrors.push('Password must have at least one special character');

    if (!gender) nextErrors.push('Please select gender');

    if (!termsChecked)
      nextErrors.push('You must accept the terms and conditions');

    if (!country) nextErrors.push('Please select a country');

    setErrors(nextErrors);

    if (nextErrors.length > 0) {
      return;
    }

    console.log('Form OK:', {
      name,
      age: ageStr,
      email,
      gender,
      country,
      termsChecked,
    });

    form.reset();
    nameRef.current?.focus();
    setErrors([]);
    setOpen(false);
  }

  return (
    <div className="flex justify-center items-center p-6 bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        {errors.length > 0 && (
          <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

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
              htmlFor="confirm-password"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
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
        <ImageUpload resetPriview={reset} />

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
            <option>Kazakhstan</option>
            <option>Georgia</option>
            <option>England</option>
          </select>
        </div>

        <div className="w-full flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setReset((prev) => !prev);
              setOpen(false);
              setErrors([]);
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
    </div>
  );
}

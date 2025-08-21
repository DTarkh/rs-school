import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormSchema } from '../schema/uncontrolledFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import ImageUpload, { toBase64 } from './ImageUpload';
import { FormActions } from '../store/formDataSlice';
import { useDispatch } from 'react-redux';

type Form = z.infer<typeof FormSchema>;

export default function ReactHookForm({
  setOpen,
}: {
  setOpen: (val: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
  } = useForm<Form>({
    resolver: zodResolver(FormSchema),
    criteriaMode: 'all',
  });

  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [resetFile, setResetFile] = useState(false);
  const handleImageSelect = useCallback((file: File | null) => {
    setImageFile(file);
  }, []);

  const onSubmit = async (data: Form) => {
    console.log(data);

    dispatch(FormActions.Add(data));

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

    setOpen(false);
    setResetFile((r) => !r);
    reset();
  };

  return (
    <div className="flex justify-center items-center p-6 bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div className="flex flex-col">
          <label
            htmlFor="rhf-name"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            {...register('name')}
            type="text"
            name="name"
            id="rhf-name"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Age */}
        <div className="flex flex-col">
          <label
            htmlFor="rhf-age"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            {...register('age', { valueAsNumber: true })}
            type="text"
            name="age"
            id="rhf-age"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
          {errors.age && (
            <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="rhf-email"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            name="email"
            id="rhf-email"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="rhf-password"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register('password')}
              type="password"
              name="password"
              id="rhf-password"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.password?.types &&
              Object.values(errors.password.types)
                .flatMap((msg) => String(msg).split(/(?=Password must )/g))
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line, i) => (
                  <p
                    className={`text-red-500 text-xs mt-1 ${i > 0 ? 'whitespace-nowrap' : ''}`}
                    key={i}
                  >
                    {line}
                  </p>
                ))}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="rhf-confirm-password"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              {...register('confirmPassword')}
              type="password"
              name="confirmPassword"
              id="rhf-confirm-password"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-6">
          <label
            htmlFor="rhf-gender-male"
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <input
              {...register('gender')}
              type="radio"
              name="gender"
              value="male"
              id="rhf-gender-male"
              className="accent-blue-500"
            />
            Male
          </label>

          <label
            htmlFor="rhf-gender-female"
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <input
              {...register('gender')}
              type="radio"
              name="gender"
              value="female"
              id="rhf-gender-female"
              className="accent-pink-500"
            />
            Female
          </label>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
          )}
        </div>

        <label
          htmlFor="rhf-terms"
          className="flex items-center gap-2 text-sm text-gray-700"
        >
          <input
            {...register('terms')}
            type="checkbox"
            name="terms"
            id="rhf-terms"
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
          <span>I accept the terms and conditions</span>
          {errors.terms && (
            <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
          )}
        </label>

        <ImageUpload resetTrigger={resetFile} onSelect={handleImageSelect} />
        {!imageFile && isSubmitted && (
          <p className="text-red-500 text-xs mt-1">Please upload image</p>
        )}

        <div className="flex flex-col">
          <label
            htmlFor="rhf-country"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <select
            {...register('country')}
            id="rhf-country"
            name="country"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option></option>
            <option>Kazakhstan</option>
            <option>Georgia</option>
            <option>England</option>
          </select>
          {errors.country && (
            <p className="text-red-500 text-xs mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        <div className="w-full flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-4 py-1 bg-amber-400 text-amber-50 cursor-pointer"
          >
            Close
          </button>
          <button
            disabled={isSubmitting}
            type="submit"
            className="px-4 py-1 text-amber-50 cursor-pointer bg-fuchsia-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

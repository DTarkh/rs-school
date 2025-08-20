export default function ReactHookForm({
  setOpen,
}: {
  setOpen: (val: boolean) => void;
}) {
  return (
    <div className="flex justify-center items-center p-6 bg-gray-100">
      <form className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4">
        {/* Name */}
        <div className="flex flex-col">
          <label
            htmlFor="rhf-name"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="rhf-name"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
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
            type="text"
            name="age"
            id="rhf-age"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="rhf-email"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="rhf-email"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Password + Confirm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="rhf-password"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="rhf-password"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="rhf-confirm-password"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm-password"
              id="rhf-confirm-password"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Gender */}
        <div className="flex gap-6">
          <label
            htmlFor="rhf-gender-male"
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <input
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
              type="radio"
              name="gender"
              value="female"
              id="rhf-gender-female"
              className="accent-pink-500"
            />
            Female
          </label>
        </div>

        {/* Terms */}
        <label
          htmlFor="rhf-terms"
          className="flex items-center gap-2 text-sm text-gray-700"
        >
          <input
            type="checkbox"
            name="terms"
            id="rhf-terms"
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
          <span>I accept the terms and conditions</span>
        </label>

        {/* Country */}
        <div className="flex flex-col">
          <label
            htmlFor="rhf-country"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <select
            id="rhf-country"
            name="country"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option></option>
            <option>Kazakhstan</option>
            <option>Georgia</option>
            <option>England</option>
          </select>
        </div>

        {/* Actions */}
        <div className="w-full flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-1 bg-amber-400 text-amber-50 cursor-pointer"
          >
            Close
          </button>
          <button
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

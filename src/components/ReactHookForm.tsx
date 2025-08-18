export default function ReactHookForm({
  setOpen,
}: {
  setOpen: (val: boolean) => void;
}) {
  return (
    <div className="flex justify-center items-center p-6 bg-gray-100">
      <form className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
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
            type="text"
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
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
          <span>I accept the terms and conditions</span>
        </label>

        <div className="flex flex-col">
          <label
            htmlFor="country"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <select
            id="country"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option></option>
            <option>Kazakhstan</option>
            <option>Georgia</option>
            <option>England</option>
          </select>
        </div>

        {/* Submit */}
        <div className="w-full flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-1 bg-amber-400 text-amber-50 cursor-pointer"
          >
            Close
          </button>
          <button
            type="submit"
            className="px-4 py-1 text-amber-50  cursor-pointer bg-fuchsia-700 "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

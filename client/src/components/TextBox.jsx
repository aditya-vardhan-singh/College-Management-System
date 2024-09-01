const TextBox = (p) => {
  return (
    <>
      <div className="sm:col-span-2">
        <label
          htmlFor={p.id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {p.label}
        </label>
        <div className="mt-2">
          <input
            id={p.id}
            name={p.id}
            type="text"
            autoComplete={p.id}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
            value={p.value}
            onChange={(e) =>
              e.set((prev) => {
                return { ...prev, fName: e.target };
              })
            }
          />
        </div>
      </div>
    </>
  );
};

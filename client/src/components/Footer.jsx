export default function Footer() {
  const current_year = new Date().getFullYear();
  return (
    <footer className="mt-8 bg-indigo-900 shadow m-0 dark:bg-indigo-900">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-indigo-300 sm:text-center dark:text-indigo-300">
          © {current_year}{" "}
          <a href="#" className="hover:underline">
            Aditya Vardhan Singh
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-indigo-300 dark:text-indigo-300 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

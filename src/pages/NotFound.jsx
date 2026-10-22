
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-5xl font-bold text-[#252A30]">
        404
      </h1>

      <p className="mb-6 text-lg text-[#64717D]">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="rounded-lg bg-sky-600 px-5 py-3 text-white transition hover:bg-sky-700"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;

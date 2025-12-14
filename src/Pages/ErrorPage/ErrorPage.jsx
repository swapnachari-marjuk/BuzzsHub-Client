import React from "react";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  const status = error?.status || "Oops!";
  const message =
    error?.statusText ||
    error?.message ||
    "Something went wrong. Please try again later.";

  return (
    <section className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-md w-full bg-base-100 shadow-xl rounded-2xl p-8 text-center">
        {/* Error Code */}
        <h1 className="text-6xl font-extrabold text-error mb-4">{status}</h1>

        {/* Error Message */}
        <p className="text-lg text-gray-600 mb-6">{message}</p>

        {/* Friendly Text */}
        <p className="text-sm text-gray-500 mb-8">
          Don’t worry! The page you’re looking for might have been moved,
          deleted, or temporarily unavailable.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link to="/" className="btn btn-primary">
            Go Back Home
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="btn btn-outline"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;

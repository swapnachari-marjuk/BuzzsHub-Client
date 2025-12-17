import React from "react";
import { Link } from "react-router";
import { HiXCircle } from "react-icons/hi";

const PaymentCancel = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl text-center border border-gray-100">
        {/* Cancel Icon */}
        <div className="flex justify-center mb-6">
          <HiXCircle className="text-red-500 text-8xl drop-shadow-sm" />
        </div>

        {/* Heading & Text */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h2>
        <p className="text-gray-500 mb-8 text-balance">
          Your payment process was cancelled or could not be completed at this
          time.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/allClubs"
            className="btn btn-error w-full py-4 rounded-xl font-bold text-lg text-white normal-case shadow-lg hover:shadow-xl transition-all"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="btn btn-ghost w-full py-4 rounded-xl font-semibold text-gray-500 hover:bg-gray-100 transition-all underline underline-offset-4"
          >
            Go to Home
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-400 italic">
          No funds will be charged if the transaction was cancelled.
        </p>
      </div>
    </div>
  );
};

export default PaymentCancel;

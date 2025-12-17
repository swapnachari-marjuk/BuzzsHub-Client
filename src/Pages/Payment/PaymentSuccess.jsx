import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { HiCheckCircle } from "react-icons/hi";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    axiosSecure
      .post(`/verify-payment-session?sessionId=${sessionId}`)
      .then((res) => console.log(res));
  }, [axiosSecure, sessionId]);
  console.log(sessionId);
  return (
    <div className="min-h-[80vh] flex items-center justify-center my-10 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-100">
       {/* icons */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <HiCheckCircle className="w-16 h-16 text-green-500" />
          </div>
        </div>

        {/* text  */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        {/* Session ID Box */}
        {sessionId && (
          <div className="bg-gray-50 p-4 rounded-lg mb-8 border border-dashed border-gray-300">
            <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
              Payment Session ID
            </p>
            <p className="text-sm font-mono text-gray-700 break-all">
              {sessionId}
            </p>
          </div>
        )}

        {/* Action */}
        <Link
          to="/"
          className="inline-block w-full py-3 px-6 text-white font-semibold bg-primary hover:bg-opacity-90 rounded-xl transition duration-300 shadow-md"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;

import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { HiCheckCircle } from "react-icons/hi";
import useAxios from "../../hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  // const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosInstance
        .post(`/verify-payment-session?sessionId=${sessionId}`)
        .then((res) => {
          console.log(res.data.result, res.data.paymentId);
        })
        .catch((err) => {
          console.error("Verification failed", err);
        });
    }
  }, [axiosInstance, sessionId]);
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

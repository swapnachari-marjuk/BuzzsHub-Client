import React from "react";
import { Link } from "react-router";

const PaymentCanceled = () => {
  return (
    <div>
      <h2 className="text-center text-2xl font-bold ">Payment Canceled</h2>
      <Link to="/clubs" className="btn btn-primary">
        Try Again
      </Link>
    </div>
  );
};

export default PaymentCanceled;

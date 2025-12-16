import React from "react";
import { Link } from "react-router";

const PaymentSuccess = () => {
  return (
    <div>
      <h2 className="text-center text-2xl font-bold ">Payment Success</h2>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;

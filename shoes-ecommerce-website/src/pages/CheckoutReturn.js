import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const CheckoutReturn = () => {
  return (
    <>
      <div className="home-wrapper-2 py-5">
        <div className="text-center auth-card py-5">
          <FiCheckCircle className="fs-1 mb-2" style={{ color: "limegreen" }} />
          <h1 style={{ color: "var(--primary-color)" }}>Thank you!</h1>
          <h3>Your order was completed successfully.</h3>
          <p>
            You can visit{" "}
            <span>
              <Link to="/my-orders">My Orders</Link>
            </span>{" "}
            page at any time to check the status of your order.{" "}
          </p>
          <button className="button border-0" type="submit">
            Back To Home
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutReturn;

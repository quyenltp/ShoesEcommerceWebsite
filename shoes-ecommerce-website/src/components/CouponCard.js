import React from "react";
import { Link } from "react-router-dom";

const CouponCard = (props) => {
  const { name, discount, onApplyCoupon } = props;
  const handleApplyCoupon = () => {
    // Gọi hàm xử lý sự kiện truyền từ component cha
    if (onApplyCoupon) {
      onApplyCoupon({ name, discount });
    }
  };

  return (
    <div className="coupon-card m-2 border py-3 px-5 d-flex justify-content-between">
      <div className="coupon-content ">
        <h5 className="coupon-name">{name}</h5>
        <p className="coupon-discount mb-0">{`${discount}% OFF`}</p>
        {/* You can add additional content or styling as needed */}
      </div>
      <div className="coupon-apply ">
        <Link to="/checkout" onClick={handleApplyCoupon}>
          Apply
        </Link>
      </div>
    </div>
  );
};

export default CouponCard;

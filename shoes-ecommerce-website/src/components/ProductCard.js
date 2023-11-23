import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import compare from "../assets/images/compare.svg";
import wish from "../assets/images/wish.svg";
import wishlist from "../assets/images/wishlist.svg";
import addcart from "../assets/images/add-cart.svg";
import view from "../assets/images/view.svg";
import product01 from "../assets/images/product-01.jpg";

const ProductCard = (props) => {
  const { grid } = props;
  let location = useLocation();
  return (
    <>
      <div
        className={` ${
          location.pathname === "/product" ? `gr-${grid}` : "col-3"
        } `}
      >
        <Link
          to={`${
            location.pathname == "/"
              ? "/product/:id"
              : location.pathname == "/product/:id"
              ? "/product/:id"
              : ":id"
          }`}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img src={product01} className="img-fluid" alt="product image" />
            {/* Hover image */}
            <img src={product01} className="img-fluid" alt="product image" />
          </div>
          <div className="product-details">
            <h6 className="brand">Vans</h6>
            <h5 className="product-title">Old Skool Classic Shoes</h5>
            <ReactStars
              count={5}
              size={24}
              value="3"
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              The Old Skool was our first footwear design to showcase the famous
              Vans Sidestripe—although back then, it was just a random doodle
              drawn by founder Paul Van Doren.
            </p>
            <p className="price">$100.00</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column">
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div>
        </Link>
      </div>
      <div
        className={` ${
          location.pathname == "/product" ? `gr-${grid}` : "col-3"
        } `}
      >
        <Link
          to={`${
            location.pathname == "/"
              ? "/product/:id"
              : location.pathname == "/product/:id"
              ? "/product/:id"
              : ":id"
          }`}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <Link>
              <img src={wish} alt="wishlist" />
            </Link>
          </div>
          <div className="product-image">
            <img src={product01} className="img-fluid" alt="product image" />
            {/* Hover image */}
            <img src={product01} className="img-fluid" alt="product image" />
          </div>
          <div className="product-details">
            <h6 className="brand">Vans</h6>
            <h5 className="product-title">Old Skool Classic Shoes</h5>
            <ReactStars
              count={5}
              size={24}
              value="3"
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              The Old Skool was our first footwear design to showcase the famous
              Vans Sidestripe—although back then, it was just a random doodle
              drawn by founder Paul Van Doren.
            </p>
            <p className="price">$100.00</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column">
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;

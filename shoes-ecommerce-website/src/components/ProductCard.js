import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import compare from "../assets/images/compare.svg";
import wish from "../assets/images/wish.svg";
import wishlist from "../assets/images/wishlist.svg";
import addcart from "../assets/images/add-cart.svg";
import view from "../assets/images/view.svg";
import product01 from "../assets/images/softride-sophia-2.jpg";
import { addToWishlist } from "../features/product/productSlice";

const ProductCard = (props) => {
  const { grid, data } = props;
  const dispatch = useDispatch();

  // console.log(data);
  let location = useLocation();
  const addToWish = (id) => {
    // alert(id);
    dispatch(addToWishlist(id));
  };

  const truncateProductTitle = (text) => {
    if (text.length > 30) {
      return text.substring(0, 30) + "...";
    }
    return text;
  };

  return (
    <>
      {data &&
        data?.map((item, index) => {
          return (
            <div
              key={index}
              className={` ${
                location.pathname === "/product" ? `gr-${grid}` : "col-3"
              } `}
            >
              <Link to={`/product/${item?._id}`}>
                <div className="product-card position-relative">
                  <div className="wishlist-icon position-absolute">
                    <button
                      className="border-0 bg-transparent"
                      onClick={(e) => addToWish(item?._id)}
                    >
                      <img
                        src={wish}
                        alt="wishlist"
                        style={{ width: "20px" }}
                      />
                    </button>
                  </div>
                  <div className="product-image">
                    <img
                      src={item?.images[0]?.url}
                      // src={product01}
                      className="img-fluid mx-auto"
                      alt="product image"
                    />
                    <img
                      src={item?.images[0]?.url}
                      className="img-fluid mx-auto"
                      alt="product image"
                    />
                    {/* <img src={product01} alt="" className="img-fluid mx-auto" />
                  <img src={product01} alt="" className="img-fluid mx-auto" /> */}
                  </div>
                  <div className="product-details">
                    <h6 className="brand">{item?.brand}</h6>
                    <h5 className="product-title">
                      {truncateProductTitle(item?.title)}
                    </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={item?.totalrating.toString()}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p
                      className={`description ${
                        grid === 12 ? "d-block" : "d-none"
                      }`}
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                    ></p>
                    <p className="price">$ {item?.price}</p>
                  </div>
                  {/* <div className="action-bar position-absolute">
                  <div className="d-flex flex-column">
                    <Link
                      to={`/product/${item?._id}`}
                      className="border-0 bg-transparent"
                    >
                      <img src={view} alt="view" />
                    </Link>
                    <button className="border-0 bg-transparent">
                      <img src={addcart} alt="addcart" />
                    </button>
                  </div>
                </div> */}
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default ProductCard;

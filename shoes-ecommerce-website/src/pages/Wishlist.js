import React, { useEffect } from "react";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
const Wishlist = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   getWishlistFromDb();
  // }, []);
  // const getWishlistFromDb = () => {
  //   dispatch(getUserProductWishlist());
  // };
  const dispatch = useDispatch();
  useEffect(() => {
    getWishlistFromDb();
  }, []);
  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist());
  };
  const wishlistState = useSelector((state) => state.auth.wishlist);
  // console.log(wishlistState);
  return (
    <>
      {/* <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" /> */}
      <Container class1="wistlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {wishlistState?.map((item, index) => {})}
          <div className="col-3">
            <div className="wishlist-card position-relative">
              <img
                src="assets/images/cross.svg"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="wishlist-card-image">
                <img
                  src="assets/images/product-01.jpg"
                  alt="product"
                  className="img-fluid w-100"
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">Old Skool Classic Shoes</h5>
                <h6 className="price">$100.00</h6>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="wishlist-card position-relative">
              <img
                src="assets/images/cross.svg"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="wishlist-card-image">
                <img
                  src="assets/images/product-01.jpg"
                  alt="product"
                  className="img-fluid w-100"
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">Old Skool Classic Shoes</h5>
                <h6 className="price">$100.00</h6>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="wishlist-card position-relative">
              <img
                src="assets/images/cross.svg"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="wishlist-card-image">
                <img
                  src="assets/images/product-01.jpg"
                  alt="product"
                  className="img-fluid w-100"
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">Old Skool Classic Shoes</h5>
                <h6 className="price">$100.00</h6>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Wishlist;

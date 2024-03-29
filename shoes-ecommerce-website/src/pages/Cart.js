import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import product01 from "../assets/images/product-01.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  deleteCartProduct,
  getUserCart,
  updateCartProduct,
} from "../features/user/userSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const usercartState = useSelector((state) => {
    return state.auth?.cartProducts;
  });

  const [totalAmount, setTotalAmount] = useState(null);
  // console.log("Product Update Detail:", productUpdateDetail);
  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      ).then(() => {
        dispatch(getUserCart());
      });
    }
  }, [productUpdateDetail]);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  const updateACartProduct = () => {};

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < usercartState?.length; i++) {
      sum += Number(usercartState[i].quantity * usercartState[i].price);
    }
    setTotalAmount(sum);
  }, [usercartState]);
  return (
    <>
      {/* <Meta title={"Cart"} />
      <BreadCrumb title="Cart" /> */}
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h5 className="cart-col-1">Product</h5>
              <h5 className="cart-col-2">Price</h5>
              <h5 className="cart-col-3">Quantity</h5>
              <h5 className="cart-col-4">Total</h5>
            </div>
            {usercartState &&
              usercartState.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                  >
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img
                          src={item?.productId?.images[0]?.url}
                          className="img-fluid"
                          alt="product image"
                        />
                      </div>
                      <div className="w-75">
                        <h6 className="mb-3">{item?.productId?.title}</h6>
                        <p className="d-flex gap-10 mb-0">
                          Color :{" "}
                          <ul className="colors ps-0">
                            <li
                              style={{
                                backgroundColor: item?.color?.title,
                                border: "1px solid black",
                              }}
                            ></li>
                          </ul>
                        </p>
                        <p className="d-flex gap-10">
                          Size :{" "}
                          <span
                            className="badge border border-1 bg-white text-dark border-secondary"
                            // onClick={() => setSize(item?._id)}
                            style={{ marginRight: "10px" }}
                            // key={index}
                          >
                            {item?.size?.title}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">$ {item?.productId?.price}</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          name={"quantity" + item?._id}
                          id={"cart" + item?._id}
                          min={1}
                          max={10}
                          value={item?.quantity}
                          onChange={(e) => {
                            setProductUpdateDetail({
                              cartItemId: item?._id,
                              quantity: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <AiFillDelete
                          onClick={() => deleteACartProduct(item?._id)}
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">
                        $ {item?.productId?.price * item?.quantity}
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button button-dark">
                Continue To Shop
              </Link>
              {(totalAmount !== null || totalAmount !== 0) && (
                <div className="d-flex flex-column align-items-end gap-15">
                  <h4>Subtotal: $ {totalAmount}</h4>
                  <p style={{ fontSize: "13px" }}>
                    Shipping calculated at checkout.
                  </p>
                  <Link
                    to="/checkout"
                    className="button border-0"
                    type="submit"
                  >
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;

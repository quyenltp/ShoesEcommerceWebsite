import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { getOrders } from "../features/user/userSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(
    (state) => state?.auth?.getorderedProduct?.orders
  );
  console.log(orderState);
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <>
      {/* <BreadCrumb title="My Orders"></BreadCrumb> */}
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h5>Order Id</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount After Discount</h5>
              </div>
              <div className="col-3">
                <h5>Status</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            {orderState &&
              orderState?.map((item, index) => {
                return (
                  <div
                    style={{ backgroundColor: "var(--light-yellow)" }}
                    className="row pt-3 my-3"
                    key={index}
                  >
                    <div className="col-3">
                      <p>{item?._id}</p>
                    </div>
                    <div className="col-3">
                      <p>{item?.totalPrice}</p>
                    </div>
                    <div className="col-3">
                      <p>{item?.totalPriceAfterDiscount}</p>
                    </div>
                    <div className="col-3">
                      <p>{item?.orderStatus}</p>
                    </div>

                    <div className="col-12">
                      <div
                        className="row p-3"
                        style={{ backgroundColor: "var(--primary-color)" }}
                      >
                        <div className="col-4">
                          <h6 className="text-white">Product Name</h6>
                        </div>
                        <div className="col-2">
                          <h6 className="text-white">Quantity</h6>
                        </div>
                        <div className="col-2">
                          <h6 className="text-white">Price</h6>
                        </div>
                        <div className="col-2">
                          <h6 className="text-white">Color</h6>
                        </div>
                        <div className="col-2">
                          <h6 className="text-white">Size</h6>
                        </div>

                        {item?.orderItems?.map((i, index) => {
                          return (
                            <div className="col-12">
                              <div className="row p-3">
                                <div className="col-4">
                                  <p className="text-white">
                                    {i?.product?.title}
                                  </p>
                                </div>
                                <div className="col-2">
                                  <p className="text-white">{i?.quantity}</p>
                                </div>
                                <div className="col-2">
                                  <p className="text-white">{i?.price}</p>
                                </div>
                                <div className="col-2">
                                  <ul className="colors ps-0">
                                    <li
                                      style={{
                                        backgroundColor: i?.color.title,
                                        border: "1px solid black",
                                      }}
                                    ></li>
                                  </ul>
                                </div>
                                <div className="col-2">
                                  <span
                                    className="badge border border-1 bg-white text-dark border-secondary"
                                    style={{ marginRight: "10px" }}
                                  >
                                    {i?.size?.title}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Orders;

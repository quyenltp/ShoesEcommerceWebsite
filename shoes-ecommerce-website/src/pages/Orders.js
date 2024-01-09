import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

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

  const parseTime = (time) => {
    return moment(time).format("DD-MM-YYYY, HH:mm");
  };

  return (
    <>
      {/* <BreadCrumb title="My Orders"></BreadCrumb> */}
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            {/* <div className="row">
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
            </div> */}
            <h3 className="text-center">My Orders</h3>
          </div>
          <div className="col-12 mt-3">
            {orderState &&
              orderState
                ?.slice()
                .reverse()
                .map((item, index) => {
                  return (
                    <div
                      style={{ backgroundColor: "var(--primary-color)" }}
                      className="row pt-3 my-4"
                      key={index}
                    >
                      <div className="col-4">
                        <p className="text-white ps-3">
                          <span className="fw-bold">Order Id:</span> {item?._id}
                        </p>
                      </div>
                      {/* <div className="col-1">
                      <p className="text-white">
                        <span className="fw-bold">Price:</span>
                        {" $"}
                        {item?.totalPrice}
                      </p>
                    </div> */}
                      <div className="col-3">
                        <p className="text-white">
                          <span className="fw-bold">Price After Discount:</span>
                          {" $"}
                          {item?.totalPriceAfterDiscount}
                        </p>
                      </div>
                      <div className="col-3">
                        <p className="text-white">
                          <span className="fw-bold">Order Date:</span>{" "}
                          {parseTime(item?.createdAt)}
                        </p>
                      </div>
                      <div className="col-2">
                        <p className="text-white">
                          <span className="fw-bold">Order Status:</span>{" "}
                          {item?.orderStatus}
                        </p>
                      </div>

                      <div className="col-12">
                        <div
                          className="row pt-3"
                          style={{ backgroundColor: "#E4E4E4" }}
                        >
                          <div className="col-4">
                            <h6 className="text-black ps-5">Product Name</h6>
                          </div>
                          <div className="col-3">
                            <h6 className="text-black text-center">Quantity</h6>
                          </div>
                          <div className="col-3">
                            <h6 className="text-black text-center">Price</h6>
                          </div>
                          <div className="col-1">
                            <h6 className="text-black">Color</h6>
                          </div>
                          <div className="col-1">
                            <h6 className="text-black">Size</h6>
                          </div>

                          {item?.orderItems?.map((i, index) => {
                            return (
                              <div className="col-12">
                                <div className="row p-2">
                                  <div className="col-4">
                                    <p className="text-black ps-4">
                                      {i?.product?.title}
                                    </p>
                                  </div>
                                  <div className="col-3">
                                    <p className="text-black text-center">
                                      {i?.quantity}
                                    </p>
                                  </div>
                                  <div className="col-3">
                                    <p className="text-black text-center">
                                      $ {i?.price}
                                    </p>
                                  </div>
                                  <div className="col-1">
                                    <ul className="colors ps-2 align-self-center">
                                      <li
                                        style={{
                                          backgroundColor: i?.color.title,
                                          border: "1px solid black",
                                        }}
                                      ></li>
                                    </ul>
                                  </div>
                                  <div className="col-1 ps-3">
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

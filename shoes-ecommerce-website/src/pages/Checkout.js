import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import { HiOutlineCash } from "react-icons/hi";

import Container from "../components/Container";
import cod from "../assets/images/cod.png";
import vnpay from "../assets/images/vnpay.png";
import momo from "../assets/images/momo.jpg";
import zalopay from "../assets/images/zalopay.png";

import { createAnOrder } from "../features/user/userSlice";

const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is Required."),
  lastName: yup.string().required("Last Name is Required."),
  address: yup.string().required("Address Details is Required."),
  state: yup.string().required("State is Required."),
  city: yup.string().required("City is Required."),
  country: yup.string().required("Country is Required."),
  pincode: yup.number().required("Pincode is Required."),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const authState = useSelector((state) => state?.auth);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [cartProductState, setCartProductState] = useState([]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotalAmount(sum);
    }
  }, [cartState]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      localStorage.setItem("address", JSON.stringify(values));
      setTimeout(() => {
        checkoutHandler();
      }, 300);
    },
  });

  // const loadScript = (src) => {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.onload = () => {
  //       resolve(true);
  //     };
  //     script.onerror = () => {
  //       resolve(false);
  //     };
  //     document.body.appendChild(script);
  //   });
  // };

  useEffect(() => {
    let items = [];

    for (let index = 0; index < cartState?.length; index++) {
      // console.log(cartState[index]);
      items.push({
        product: cartState[index].productId._id,
        quantity: cartState[index].quantity,
        color: cartState[index].color._id,
        price: cartState[index].price,
      });
    }
    setCartProductState(items);
  }, []);

  const checkoutHandler = async () => {
    // const res = await loadScript();
    const result = await axios.post(
      "http://localhost:5000/api/user/order/checkout",
      { amount: totalAmount + 5 },
      config
    );
    if (!result) {
      alert("Something went wrong.");
      return;
    }
    const { amount, id: order_id, currency } = result.data.order;
    const options = {
      amount: amount,
      currency: currency,
      order_id: order_id,
      handler: async function () {
        dispatch(
          createAnOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems: [cartProductState],
            shippingInfo,
          })
        );
      },
    };
  };

  return (
    <>
      <Container class1="checkout-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              {/* <h3 className="website-name">Sneakify</h3> */}
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart" href="#">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <div className="info-wrapper bg-white p-4 mb-4">
                <h5 className="title total">Contact Information</h5>
                <p className="user-details mb-1">
                  Name: {authState?.user?.firstname} {authState?.user?.lastname}
                </p>
                <p className="mb-1">Email: {authState?.user?.email}</p>
                {/* <p className="mb-0">Phone: {authState?.user?.mobile}</p> */}
              </div>
              <div className="address-wrapper bg-white p-4">
                <h5 className="py-2 total">Shipping Address</h5>
                <form
                  onSubmit={formik.handleSubmit}
                  action=""
                  className="d-flex gap-10 justify-content-between flex-wrap"
                >
                  <div className="w-100">
                    <select
                      name="country"
                      onChange={formik.handleChange("country")}
                      onBlur={formik.handleBlur("country")}
                      value={formik.values.country}
                      className="form-control form-select"
                      id=""
                    >
                      <option value="" selected disabled>
                        Select Country
                      </option>
                      <option value="vietnam">Vietnam</option>
                    </select>
                    <div className="error ms-2 my-1">
                      {formik.touched.country && formik.errors.country}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      name="firstName"
                      onChange={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                      value={formik.values.firstName}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.firstName && formik.errors.firstName}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      name="lastName"
                      onChange={formik.handleChange("lastName")}
                      onBlur={formik.handleBlur("lastName")}
                      value={formik.values.lastName}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.lastName && formik.errors.lastName}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Address"
                      className="form-control"
                      name="address"
                      onChange={formik.handleChange("address")}
                      onBlur={formik.handleBlur("address")}
                      value={formik.values.address}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Apartment, Suite, etc"
                      className="form-control"
                      name="other"
                      onChange={formik.handleChange("other")}
                      onBlur={formik.handleBlur("other")}
                      value={formik.values.other}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.other && formik.errors.other}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="City"
                      className="form-control"
                      name="city"
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                      value={formik.values.city}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.city && formik.errors.city}
                    </div>
                  </div>
                  {/* <div className="flex-grow-1">
                    <select
                      name="state"
                      onChange={formik.handleChange("state")}
                      onBlur={formik.handleBlur("state")}
                      value={formik.values.state}
                      className="form-control form-select"
                      id=""
                    >
                      <option value="" selected disabled>
                        Select State
                      </option>
                      <option value="stateA">State A</option>
                    </select>
                    <div className="error ms-2 my-1">
                      {formik.touched.state && formik.errors.state}
                    </div>
                  </div> */}
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Zip Code"
                      className="form-control"
                      name="pincode"
                      onChange={formik.handleChange("pincode")}
                      onBlur={formik.handleBlur("pincode")}
                      value={formik.values.pincode}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.pincode && formik.errors.pincode}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="payment-method-wrapper my-4 p-4 bg-white">
              <h5 className="total mb-3">Choose your payment method:</h5>
              <div className="payment-method">
                <div class="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked
                  />
                  <label className="form-check-label" for="flexRadioDefault1">
                    {/* <HiOutlineCash /> */}
                    <img src={cod} alt="" width={30} />
                    &nbsp; Cash on delivery
                  </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label className="form-check-label" for="flexRadioDefault1">
                    <img src={vnpay} alt="" width={30} />
                    &nbsp; VNPAY
                  </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label className="form-check-label" for="flexRadioDefault1">
                    <img src={momo} alt="" width={30} />
                    &nbsp; MoMo
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label className="form-check-label" for="flexRadioDefault1">
                    <img src={zalopay} alt="" width={30} />
                    &nbsp; ZaloPay
                  </label>
                </div>
              </div>
            </div>
            <div>
              <div className="w-100">
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/cart" className="text-dark">
                    <BiArrowBack className="me-2" />
                    Return to Cart
                  </Link>
                  <Link to="/product" className="button">
                    Continue to Shopping
                  </Link>
                  <button className="button border-0" type="submit">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-5">
            <div className="p-4">
              <div className="border-bottom py-4">
                {cartState &&
                  cartState.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex gap-10 mb-2 align-items-center"
                      >
                        <div className="w-75 d-flex gap-10">
                          <div className="w-25 position-relative">
                            <span
                              style={{ top: "-10px", right: "2px" }}
                              className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                            >
                              {item?.quantity}
                            </span>
                            <img
                              // className="img-fluid"
                              width={100}
                              height={100}
                              src={item?.productId?.images[0]?.url}
                              alt="product"
                            />
                          </div>
                          <div>
                            <h5 className="total-price">
                              {item?.productId?.title}
                            </h5>
                            <p className="total-price">{item?.color?.title}</p>
                            <p className="total-price">{item?.size?.title}</p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="total">
                            $ {item?.price * item?.quantity}
                          </h5>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Subtotal</p>
                  <p className="total-price">
                    $ {totalAmount ? totalAmount : "0"}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">$ 50</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">
                  $ {totalAmount ? totalAmount + 50 : "0"}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { base_url, config } from "../utils/axiosConfig";
import { HiOutlineCash } from "react-icons/hi";
import CouponCard from "../components/CouponCard";
import Container from "../components/Container";
import cod from "../assets/images/cod.png";
import vnpay from "../assets/images/vnpay.png";
import momo from "../assets/images/momo.jpg";
import zalopay from "../assets/images/zalopay.png";

import {
  createAnOrder,
  deleteCartProduct,
  deleteUserCart,
  getUserCart,
  resetState,
} from "../features/user/userSlice";
import ModalComponent from "../components/ModalComponent";

const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is Required."),
  lastName: yup.string().required("Last Name is Required."),
  address: yup.string().required("Address Details is Required."),
  city: yup.string().required("City is Required."),
  phone: yup.number().required("Phone Number is Required."),
});

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const authState = useSelector((state) => state?.auth);
  const [totalAmount, setTotalAmount] = useState(null);
  const [cartProductState, setCartProductState] = useState([]);
  // const [shippingInfo, setShippingInfo] = useState(null);
  // const [paymentInfo, setPaymentInfo] = useState({
  //   razorpayPaymentId: "",
  //   razorpayOrderId: "",
  // });
  const shippingInfoRef = useRef(null);
  const paymentInfoRef = useRef({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("cashOnDelivery");
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.id);
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotalAmount(sum);
    }
  }, [cartState]);

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  // useEffect(() => {
  //   if (
  //     authState?.orderedProduct?.order !== null &&
  //     authState?.orderedProduct?.success === true
  //   ) {
  //     navigate("/my-orders");
  //   }
  // }, [authState]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      phone: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      shippingInfoRef.current = values;
      // await setShippingInfo(values);
      localStorage.setItem("address", JSON.stringify(values));
      checkoutHandler();
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
      items.push({
        product: cartState[index].productId._id,
        quantity: cartState[index].quantity,
        color: cartState[index].color._id,
        size: cartState[index].size._id,
        price: cartState[index].price,
      });
    }
    setCartProductState(items);
  }, []);

  // const checkoutHandler = async () => {
  //   // const res = await loadScript(
  //   //   "https://checkout.razorpay.com/v1/checkout.js"
  //   // );
  //   const result = await axios.post(
  //     "http://localhost:5000/api/user/order/checkout",
  //     { amount: totalAmount + 50 },
  //     config()
  //   );
  //   // if (!res) {
  //   //   alert("Razorpay SDK failed to load.");
  //   //   return;
  //   // }
  //   if (!result) {
  //     alert("Something went wrong.");
  //     return;
  //   }
  //   const { amount, id: order_id } = result.data.order;
  //   const options = {
  //     key: "rzp_test_rMcjpafCZaMpP1",
  //     amount: amount,
  //     currency: currency,
  //     name: "Sneakify",
  //     description: "Test Transaction",
  //     order_id: order_id,
  //     handler: async function (response) {
  //       const data = {
  //         orderCreationId: order_id,
  //         razorpayPaymentId: response.razorpay_payment_id,
  //         razorpayOrderId: response.razorpay_order_id,
  //       };
  //       const result = await axios.post(
  //         "http://localhost:5000/api/user/order/paymentVerification",
  //         data,
  //         config()
  //       );
  //       // setPaymentInfo(result.data);

  //       // setPaymentInfo({
  //       //   // razorpayPaymentId: response.razorpay_payment_id,
  //       //   // razorpayOrderId: response.razorpay_order_id,
  //       //   razorpayPaymentId: "razorpaymentid",
  //       //   razorpayOrderId: "razororderid",
  //       // });

  //       // if (selectedPaymentMethod === "cashOnDelivery") {

  //       // }

  //       dispatch(
  //         createAnOrder({
  //           totalPrice: totalAmount,
  //           totalPriceAfterDiscount: totalAmount,
  //           orderItems: cartProductState,
  //           paymentInfo: {
  //             razorpayPaymentId: "razorpaymentid",
  //             razorpayOrderId: "razororderid",
  //           },
  //           shippingInfo: JSON.parse(localStorage.getItem("address")),
  //         })
  //       );

  //       dispatch(deleteUserCart(config()));
  //       localStorage.removeItem("address");
  //       dispatch(resetState());
  //     },
  //   };
  // };

  const checkoutHandler = async () => {
    const result = await axios.post(
      "http://localhost:5000/api/user/order/checkout",
      {
        amount:
          totalAmount +
          30 -
          calculateDiscount(
            selectedValue.discount,
            selectedValue.limit,
            totalAmount
          ),
      },
      config()
    );

    if (!result) {
      alert("Something went wrong.");
      return;
    }

    if (selectedPaymentMethod === "cashOnDelivery") {
      dispatch(
        createAnOrder({
          totalPrice: totalAmount,
          totalPriceAfterDiscount:
            totalAmount +
            30 -
            calculateDiscount(
              selectedValue.discount,
              selectedValue.limit,
              totalAmount
            ),
          orderItems: cartProductState,
          paymentInfo: {
            paymentType: "cash",
            paymentId: "cash",
          },
          shippingInfo: JSON.parse(localStorage.getItem("address")),
        })
      );

      dispatch(deleteUserCart(config()));
      localStorage.removeItem("address");
      dispatch(resetState());
      navigate("/checkout-success");
    } else if (selectedPaymentMethod === "vnpay") {
      const { amount, id: orderId } = result.data.order;
      console.log("amount", amount, "orderId", orderId);

      const body = {
        orderId,
        amount,
        orderDescription: "test description",
        orderType: "topup",
      };

      const url = `${base_url}user/create_payment_url`;
      console.log("url", url);
      try {
        const reqConfig = config();
        reqConfig.headers = {
          ...reqConfig.headers,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        };
        console.log(reqConfig);
        const response = await axios.post(url, JSON.stringify(body), reqConfig);
        console.log(response);
        let vnpUrl = "";
        if (response.status === 200) {
          console.log("ok!");
          vnpUrl = response.data.url;
        }
        console.log("url", vnpUrl);
        if (vnpUrl) window.location.href = vnpUrl;
        const urlParams = new URLSearchParams(vnpUrl.split("?")[1]);
        const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");

        dispatch(
          createAnOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount:
              totalAmount +
              30 -
              calculateDiscount(
                selectedValue.discount,
                selectedValue.limit,
                totalAmount
              ),
            orderItems: cartProductState,
            paymentInfo: {
              paymentType: "VNPay",
              paymentId: "vnp_TransactionNo",
            },
            shippingInfo: JSON.parse(localStorage.getItem("address")),
          })
        );

        dispatch(deleteUserCart(config()));
        localStorage.removeItem("address");
        dispatch(resetState());
      } catch (err) {
        console.log(err);
      }
    }
  };

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const calculateDiscount = (discount, limit, totalAmount) => {
    return (totalAmount * discount) / 100 > limit
      ? limit
      : (totalAmount * discount) / 100;
  };

  return (
    <>
      <Container class1="checkout-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              {/* <h3 className="website-name">Sneakify</h3> */}
              {/* <nav
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
              </nav> */}
              <div className="info-wrapper bg-white p-4 mb-4">
                <h5 className="title total">Contact Information</h5>
                <p className="user-details mb-1">
                  Name: {authState?.user?.firstname} {authState?.user?.lastname}
                </p>
                <p className="mb-1">Email: {authState?.user?.email}</p>
                {/* <p className="mb-0">Phone: {authState?.user?.mobile}</p> */}
              </div>
              <div className="payment-method-wrapper my-4 p-4 bg-white">
                <h5 className="total mb-3">Choose your payment method:</h5>
                <div className="payment-method">
                  <div class="form-check mb-3">
                    <input
                      type="radio"
                      id="cashOnDelivery"
                      className="form-check-input"
                      name="paymentMethod"
                      checked={selectedPaymentMethod === "cashOnDelivery"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label className="form-check-label" for="flexRadioDefault1">
                      {/* <HiOutlineCash /> */}
                      <img src={cod} alt="" width={30} />
                      &nbsp; Cash on delivery
                    </label>
                  </div>
                  <div class="form-check mb-3">
                    <input
                      type="radio"
                      id="vnpay"
                      className="form-check-input"
                      name="paymentMethod"
                      checked={selectedPaymentMethod === "vnpay"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label className="form-check-label" for="flexRadioDefault1">
                      <img src={vnpay} alt="" width={30} />
                      &nbsp; VNPAY
                    </label>
                  </div>
                  {/* <div class="form-check mb-3">
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
                  </div> */}
                </div>
              </div>
              <div className="address-wrapper bg-white p-4">
                <h5 className="py-2 total">Shipping Address</h5>
                <form
                  onSubmit={formik.handleSubmit}
                  action=""
                  className="d-flex gap-10 justify-content-between flex-wrap"
                >
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
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="form-control"
                      name="phone"
                      onChange={formik.handleChange("phone")}
                      onBlur={formik.handleBlur("phone")}
                      value={formik.values.phone}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.phone && formik.errors.phone}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Notes"
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
                  <div className="w-100 checkout-btn">
                    <div>
                      <Link to="/product" className="button">
                        Continue to Shopping
                      </Link>
                    </div>
                    <div className="order-btn ">
                      <button className="button border-0" type="submit">
                        Place Order
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-5">
            <div className="checkout-product-details">
              <div className="border-bottom py-4">
                {cartState &&
                  cartState?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex gap-10 mb-4 align-items-center"
                      >
                        <div className="w-75 d-flex gap-10">
                          <div className="w-25 position-relative">
                            <span
                              style={{ top: "-15px", right: "-20px" }}
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
                          <div className="px-4">
                            <h5 className="total-price ">
                              {item?.productId?.title}
                            </h5>
                            <p className="total-price mb-1 prop-label">
                              Color: {item?.color?.title}
                            </p>
                            <p className="total-price prop-label">
                              Size: {item?.size?.title}
                            </p>
                          </div>
                        </div>
                        <div className="flex-grow-1 ps-5">
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
                  <p className="mb-0 total-price">$ 30</p>
                </div>
              </div>
              <div className="border-bottom py-4 d-flex justify-content-between">
                <div className="apply-coupon ">
                  <Link onClick={handleClickOpen} style={{ cursor: "pointer" }}>
                    {selectedValue
                      ? `${selectedValue.name}`
                      : "Apply Your Coupons"}
                  </Link>
                </div>
                <ModalComponent
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                />
                <div>
                  <p className="mb-0 total-price">
                    {selectedValue
                      ? `- $ ${calculateDiscount(
                          selectedValue?.discount,
                          selectedValue?.limit,
                          totalAmount
                        )}`
                      : ""}
                  </p>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price" style={{ fontSize: "24px" }}>
                  {selectedValue
                    ? `$ ${
                        totalAmount
                          ? totalAmount +
                            30 -
                            calculateDiscount(
                              selectedValue?.discount,
                              selectedValue?.limit,
                              totalAmount
                            )
                          : "0"
                      }`
                    : `$ ${totalAmount ? totalAmount + 30 : "0"}`}
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

// ModalComponent.js
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import CustomInput from "./CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoupons } from "../features/coupons/couponSlice";
import "../Modal.css";
import CouponCard from "./CouponCard";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";

Modal.setAppElement("#root");
const ModalComponent = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const couponState = useSelector((state) => state?.coupon?.coupon);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  const openModal = () => {
    dispatch(getAllCoupons());
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [selectedCoupon, setSelectedCoupon] = useState("");

  const handleCouponChange = (event) => {
    setSelectedCoupon(event.target.id);
  };

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const [isSelected, setIsSelected] = useState(false);

  const handleSelectedCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setIsSelected(true);
  };

  const handleIsSelectedCoupon = () => {
    if (isSelected) {
      setIsSelected(false);
    } else {
      setIsSelected(true);
    }
  };

  return (
    <div className="modal-container">
      {/* <div className="apply-coupon ">
        <Link onClick={openModal} style={{ cursor: "pointer" }}>
          Apply Your Coupons
        </Link>
      </div> */}
      {/* <button onClick={openModal}>Open Modal</button> */}

      <Dialog
        maxWidth="xs"
        fullWidth={true}
        onClose={handleClose}
        open={open}
        style={{
          overlay: {
            position: "fixed",
            // zIndex: 1020,
            // top: "25%",

            background: "rgba(255, 255, 255, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            left: "25%",
            width: "50%",
            height: "85%",
            position: "absolute",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className="p-4">
          <div className="d-flex justify-content-between mb-2">
            <h2>Coupons</h2>
            {/* <button className="button border-0 mt-3" onClick={handleClose}>
              Close
            </button> */}
            <IoClose
              className="mb-0"
              style={{ cursor: "pointer", width: "30px", height: "30px" }}
              onClick={handleClose}
            />
          </div>
          {/* <div className="d-flex">
          
          <CustomInput
            type="text"
            placeholder="Coupon Code"
            className="w-100"
          />
        </div> */}
          <div className=" d-flex justify-content-between">
            <div className="">
              <div className="input-group mt-1 mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="#7952b3"
                    class="bi bi-ticket-perforated"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 4.85v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9z" />
                    <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9z" />
                  </svg>
                </span>

                <CustomInput
                  aria-describedby="addon-wrapping"
                  type="text"
                  placeholder="Coupon Code"
                  className="form-control-coupon h-100"
                ></CustomInput>
              </div>
            </div>
            <div className="">
              <button className="button border-0 " onClick={handleCouponChange}>
                Apply
              </button>
            </div>
          </div>

          <div>
            <p>Here is your coupon list.</p>
          </div>
          {/* <div className="coupon-list"> */}
          {/* {couponState &&
            Array.isArray(couponState) &&
            couponState.map((item, index) => {
              console.log("Coupon Item:", item);
              return <p key={index}>{item?.name}</p>;
            })} */}
          {/* {couponState.coupon &&
            couponState.coupon.map((coupon) => (
              <CouponCard key={coupon._id} {...coupon}></CouponCard>
            ))}
        </div> */}

          {couponState.coupon &&
            couponState.coupon.map((coupon) => {
              const isSelected = coupon._id === selectedCoupon?._id;

              return (
                <div className="coupon-card m-2 border py-3 px-5">
                  <div className="coupon-content ">
                    <div
                      key={coupon._id}
                      className=" d-flex justify-content-between"
                    >
                      <div>
                        <h5 className="coupon-name">{coupon.name}</h5>
                        <p className="coupon-discount mb-0">{`${coupon.discount}% OFF`}</p>
                        <p className="coupon-discount mb-0">{`Up to $ ${coupon.limit}`}</p>
                      </div>

                      <div className="coupon-apply">
                        {isSelected ? (
                          <span className="applied-text">Applied</span>
                        ) : (
                          <Link
                            to="/checkout"
                            onClick={() => {
                              handleListItemClick(coupon);
                            }}
                          >
                            Apply
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Dialog>
    </div>
  );
};

ModalComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default ModalComponent;

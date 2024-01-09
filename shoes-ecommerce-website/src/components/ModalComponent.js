// ModalComponent.js
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import CustomInput from "./CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoupons } from "../features/coupons/couponSlice";
Modal.setAppElement("#root");
const ModalComponent = () => {
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

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Coupons</h2>
        {/* <div className="d-flex">
          
          <CustomInput
            type="text"
            placeholder="Coupon Code"
            className="w-100"
          />
        </div> */}
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
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
            className="form-control"
          ></CustomInput>
        </div>

        <div>
          <p>Here is your coupon list.</p>
        </div>
        <div className="coupon-list">
          {/* {couponState &&
            Array.isArray(couponState) &&
            couponState.map((item, index) => {
              console.log("Coupon Item:", item);
              return <p key={index}>{item?.name}</p>;
            })} */}
          {couponState.coupon &&
            couponState.coupon.map((coupon) => (
              <li key={coupon.name}>{coupon.name}</li>
            ))}
        </div>

        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default ModalComponent;

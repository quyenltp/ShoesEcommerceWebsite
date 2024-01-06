import React from "react";
import axios from "axios";
import { base_url, config } from "../utils/axiosConfig";

const orderId = "555";
const amount = 20000;
const orderDescription = "test description";
const orderType = "topup";

const Payment = () => {
  const proceedPayment = async () => {
    const body = {
      orderId,
      amount,
      orderDescription,
      orderType,
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
    } catch (err) {
      console.log(err);
    }
  };

  return <button onClick={proceedPayment}>debug</button>;
};

export default Payment;

import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon`, config());
  if (response.data) {
    console.log(response.data);
    return { coupon: response.data };
  }
};

const getACoupon = async (id) => {
  const response = await axios.get(`${base_url}coupon/${id}`);
  if (response.data) {
    return response.data;
  }
};

export const couponService = {
  getCoupons,
  getACoupon,
};

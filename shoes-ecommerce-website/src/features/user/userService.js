import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";
import { authSlice } from "./userSlice";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
    }
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    return response.data;
  }
};

const getUserWishlist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);
  console.log("Wishlist Response:", response.data);
  if (response.data) {
    return response.data;
  }
};

// const addToCart = async (cartData) => {
//   const response = await axios.post(`${base_url}user/cart`, cartData, config);
//   if (response.data) {
//     return response.data;
//   }
// };
const addToCart = async (cartData) => {
  try {
    const response = await axios.post(`${base_url}user/cart`, cartData, config);
    return response.data;
  } catch (error) {
    throw error.response.data; // throw the error response for rejection
  }
};

export const authService = {
  register,
  login,
  getUserWishlist,
  addToCart,
};

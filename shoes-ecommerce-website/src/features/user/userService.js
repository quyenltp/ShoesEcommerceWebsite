import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";
import { authSlice } from "./userSlice";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    if (response.data) {
      // localStorage.setItem("customer", JSON.stringify(response.data));
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    // localStorage.setItem("customer", JSON.stringify(response.data));
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  }
};

const getUserWishlist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config());
  console.log("Wishlist Response:", response.data);
  if (response.data) {
    return response.data;
  }
};

const addToCart = async (cartData) => {
  console.log("Cart Data:", cartData);
  console.log("config():", config());
  const response = await axios.post(`${base_url}user/cart`, cartData, config());

  if (response.data) {
    return response.data;
  }
};
const getCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, config());
  if (response.data) {
    console.log("Cart Response:", response.data);
    return response.data;
  }
};
const createOrder = async (orderDetail) => {
  const response = await axios.post(
    `${base_url}user/cart/create-order`,
    orderDetail,
    config()
  );
  if (response.data) {
    return response.data;
  }
};

const removeProductFromCart = async (cartItemId) => {
  const response = await axios.delete(
    `${base_url}user/delete-product-cart/${cartItemId}`,
    config()
  );
  if (response.data) {
    return response.data;
  }
};

// const updateProductFromCart = async (cartDetail) => {
//   const response = await axios.put(
//     `${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,
//     config
//   );
//   if (response.data) {
//     return response.data;
//   }
// };

// const updateProductFromCart = async (cartDetail) => {
//   const response = await axios.put(
//     `${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,
//     null,
//     config
//   );
//   if (response.data) {
//     return response.data;
//   }
// };

const updateProductFromCart = async (cartDetail) => {
  try {
    const response = await axios.put(
      `${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,
      null, // Pass null as the request body since you're using a PUT request
      config()
    );
    console.log("Update Product Response:", response.data);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Update Product Error:", error);
    throw error;
  }
};

const getUserOrders = async () => {
  const response = await axios.get(`${base_url}user/getmyorders`, config());
  if (response.data) {
    return response.data;
  }
};

const updateUser = async (data) => {
  const response = await axios.put(`${base_url}user/edit-user`, data, config());
  if (response.data) {
    return response.data;
  }
};

const forgotPassToken = async (data) => {
  const response = await axios.post(
    `${base_url}user/forgot-password-token`,
    data
  );
  if (response.data) {
    return response.data;
  }
};

const emptyCart = async (data) => {
  const response = await axios.delete(
    `${base_url}user/empty-cart`,
    data,
    config()
  );
  if (response.data) {
    return response.data;
  }
};

export const authService = {
  register,
  login,
  getUserWishlist,
  addToCart,
  getCart,
  createOrder,
  removeProductFromCart,
  updateProductFromCart,
  getUserOrders,
  updateUser,
  forgotPassToken,
  emptyCart,
};

import axios from "axios";
import { authSlice } from "./userSlice";

const register = async (userData) => {
  const response = await axios.post("", userData);
  if (response.data) {
    return response.data;
  }
};

export const authService = {
  register,
};

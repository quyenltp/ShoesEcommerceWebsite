import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getColors = async () => {
  const response = await axios.get(`${base_url}color`);
  if (response.data) {
    return response.data;
  }
};

const getAColor = async (id) => {
  const response = await axios.get(`${base_url}color/${id}`);
  if (response.data) {
    return response.data;
  }
};

export const colorService = {
  getColors,
  getAColor,
};

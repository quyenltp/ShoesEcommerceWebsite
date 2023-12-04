import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getBrands = async () => {
  const response = await axios.get(`${base_url}brand`);
  if (response.data) {
    return response.data;
  }
};

const getABrand = async (id) => {
  const response = await axios.get(`${base_url}brand/${id}`);
  if (response.data) {
    return response.data;
  }
};

export const brandService = {
  getBrands,
  getABrand,
};

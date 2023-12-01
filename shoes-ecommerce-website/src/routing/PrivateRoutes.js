import { Navigatate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const getTokenFromLocalStorage = localStorage.getItem("customer");
  console.log(getTokenFromLocalStorage);
};

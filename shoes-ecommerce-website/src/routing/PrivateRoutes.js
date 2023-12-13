import { Navigatate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  // const getTokenFromLocalStorage = localStorage.getItem("customer");
  const getTokenFromLocalStorage = localStorage.getItem("user");

  console.log(getTokenFromLocalStorage);
};

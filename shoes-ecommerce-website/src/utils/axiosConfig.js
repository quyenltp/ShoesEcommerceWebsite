export const base_url = "http://localhost:5000/api/";

const getTokenFromLocalStorage = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const config = () => ({
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage ? getTokenFromLocalStorage().token : ""
    }`,
  },
  Accept: "application/json",
});

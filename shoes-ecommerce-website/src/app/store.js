// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/user/userSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import blogReducer from "../features/blogs/blogSlice";
import contactReducer from "../features/contact/contactSlice";
import brandReducer from "../features/brand/brandSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    contact: contactReducer,
    brand: brandReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       // Ignore these paths in the state
  //       ignoredPaths: ["auth.user"],
  //       // Ignore these action types
  //       ignoredActionPaths: ["payload.request", "payload.response"],
  //       // Ignore specific action types
  //       ignoredActions: ["auth/register/rejected"],
  //     },
  //   }),
});

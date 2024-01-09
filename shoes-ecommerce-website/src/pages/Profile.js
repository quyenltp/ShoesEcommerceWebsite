import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/user/userSlice";
import { FiEdit, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const profileSchema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required"),
  mobile: yup.string().required("Mobile is required"),
});

const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();

  const [edit, setEdit] = useState(true);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      dispatch(updateProfile(values));
      setEdit(true);
    },
  });

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout successfully!");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      {/* <BreadCrumb title="My Profile" /> */}
      <Container class1="cart-wrapper-home home-wrapper-2 py-4">
        <div className="row">
          <div className="col-12 auth-card">
            <div className="col-12 mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0 fs-3">Profile</h3>
                <div>
                  <FiEdit
                    className="fs-4 mx-3"
                    onClick={() => setEdit(false)}
                  />
                  <FiLogOut
                    className="fs-4"
                    type="button"
                    onClick={handleLogout}
                  />
                  {/* <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button> */}
                </div>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="example1" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  className="form-control"
                  disabled={edit}
                  id="example1"
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="example2" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  className="form-control"
                  disabled={edit}
                  id="example2"
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  disabled={edit}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail2" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                  disabled={edit}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
              </div>

              {edit === false && (
                <button
                  type="submit"
                  className="btn button border-0 btn-primary"
                >
                  Save
                </button>
              )}
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

import compare from "../assets/images/compare.svg";
import wishlist from "../assets/images/wishlist.svg";
import user from "../assets/images/user.svg";
import cart from "../assets/images/cart.svg";
import logo from "../assets/images/logo12.png";
import { getAllBrands } from "../features/brand/brandSlice";
import { getAProduct } from "../features/product/productSlice";
import { getUserCart } from "../features/user/userSlice";
// import { PiSneakerMoveFill } from "react-icons/pi";

const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state?.auth);
  const brandState = useSelector((state) => state?.brand);
  const productState = useSelector((state) => state?.product?.product);
  const [productOpt, setProductOpt] = useState([]);
  const [paginate, setPaginate] = useState(true);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(null);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum +=
        Number(cartState[index]?.quantity) * Number(cartState[index]?.price);
      setTotal(sum);
    }
  }, [cartState]);
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({
        id: index,
        prod: element?._id,
        name: element?.title,
      });
    }
    setProductOpt(data);
  }, [productState]);
  useEffect(() => {
    const fetchBrands = async () => {
      // try {
      //   const response = await fetch("/api/brand");
      //   const data = await response.json();
      //   setBrands(data);
      //   dispatch(getAllBrands()); // Dispatch the action after fetching brands
      // } catch (error) {
      //   console.error("Error fetching brands:", error);
      // }
      dispatch(getAllBrands());
    };

    fetchBrands();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserCart());
  }, []);
  console.log(brandState); // Added dispatch to dependency array

  const [typedValue, setTypedValue] = useState("");

  const handleTypeaheadInputChange = (input) => {
    setTypedValue(input);
  };

  return (
    <>
      <header className="header-top-strip py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Step into Sneakify, Step into Style.
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline: &nbsp;
                <a className="text-white" href="tel:+91 1234567890">
                  +84 123 456 789
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2 d-flex align-items-center">
              <img src={logo} alt="logo" className="logo-img" />
              {/* <PiSneakerMoveFill className="logo-img" /> */}
              <h3>
                <Link className="text-white" to="/">
                  Sneakify
                </Link>
              </h3>
            </div>
            <div className="col-6">
              <div className="input-group px-5">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getAProduct(selected[0]?.prod));
                    setPaginate(false);
                  }}
                  options={productOpt}
                  paginate={paginate}
                  labelKey={"name"}
                  placeholder="Search..."
                  minLength={1}
                  onInputChange={handleTypeaheadInputChange}
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch
                    style={{ cursor: "pointer" }}
                    className="fs-6"
                    onClick={() =>
                      navigate(`/product/productbybrand/${typedValue}`)
                    }
                  />
                </span>
              </div>
            </div>
            <div className="col-4">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                {/* <div>
                  <Link className="d-flex align-items-center gap-10 text-white">
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div> */}
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Favourite <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user === null ? "/login" : "/my-profile"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={user} alt="user" />
                    {authState?.user === null ? (
                      <p className="mb-0">
                        Login <br /> My Account
                      </p>
                    ) : (
                      <p className="mb-0">
                        Welcome <br /> {authState?.user?.firstname}
                      </p>
                    )}
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column">
                      <span className="badge bg-white text-dark mb-1">
                        {cartState?.length ? cartState?.length : 0}
                      </span>
                      <p className="mb-0">$ {total ? total : 0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="assets/images/menu.svg" alt="" />
                      <span
                        onClick={() => dispatch(getAllBrands())}
                        onHover={() => dispatch(getAllBrands())}
                        className="me-4 fs-6 d-inline-block"
                      >
                        Shop Categories
                      </span>
                    </button>
                    <ul className="dropdown-menu">
                      {brandState.brand &&
                        brandState.brand.map((brand) => (
                          <li key={brand.title}>
                            <Link
                              className="dropdown-item text-white"
                              // to={`/product/brand/${brand._id}`}
                              to={`/product/productbybrand/${encodeURIComponent(
                                brand.title
                              )}`}
                              // onClick={() =>
                              //   navigate(`/product/${brand.title}`)
                              // }
                            >
                              {brand.title}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-30">
                    <NavLink to="/" className="fs-6 px-3 ps-5">
                      Home
                    </NavLink>
                    <NavLink to="/product" className="fs-6 px-3">
                      Our Store
                    </NavLink>
                    <NavLink to="/my-orders" className="fs-6 px-3">
                      My Orders
                    </NavLink>
                    <NavLink to="/blogs" className="fs-6 px-3">
                      Blogs
                    </NavLink>
                    <NavLink to="/contact" className="fs-6 px-3">
                      Contact
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { getAllProducts } from "../features/product/productSlice";

const OurStore = () => {
  const [grid, setGrid] = useState(3);
  const productState = useSelector((state) => state?.product?.product);
  // console.log(productState);

  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    dispatch(getAllProducts());
  };

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  <li>Nike</li>
                  <li>Vans</li>
                  <li>Converse</li>
                  <li>Adidas</li>
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Availablity</h5>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    In Stock (1)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
                    Out of Stock (0)
                  </label>
                </div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                    />
                    <label htmlFor="floatingInput">To</label>
                  </div>
                </div>
                <h5 className="sub-title">Color</h5>
                <div>
                  {/* <div className="d-flex flex-wrap">
                      <ul className="colors ps-0">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div> */}
                  <Color />
                </div>
                <h5 className="sub-title">Size</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="size-1"
                    />
                    <label className="form-check-label" htmlFor="size-1">
                      37 (1)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="size-2"
                    />
                    <label className="form-check-label" htmlFor="size-2">
                      38 (2)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tag d-flex flex-wrap align-items-center gap-10">
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Old Skool
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Classic
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Air Force
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Chuck Taylor
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Chuck II
                  </span>
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Random Product</h3>
              <div>
                <div className="random-products mb-3 d-flex">
                  <div className="w-50">
                    <img
                      src="assets/images/old-skool.jpg"
                      className="img-fluid"
                      alt="old-skool"
                    />
                  </div>
                  <div className="w-50">
                    <h5>Old Skool Classic Shoes</h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value="3"
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <b>$100.00</b>
                  </div>
                </div>
                <div className="random-products d-flex">
                  <div className="w-50">
                    <img
                      src="assets/images/old-skool.jpg"
                      className="img-fluid"
                      alt="old-skool"
                    />
                  </div>
                  <div className="w-50">
                    <h5>Old Skool Classic Shoes</h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value="3"
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <b>$100.00</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    name=""
                    defaultValue={"manual"}
                    className="form-control form-select"
                    id=""
                  >
                    <option value="manual">Featured</option>
                    <option value="best-selling">Best selling</option>
                    <option value="title-ascending">Alphabetically, A-Z</option>
                    <option value="title-descending">
                      Alphabetically, Z-A
                    </option>
                    <option value="price-ascending">Price, low to high</option>
                    <option value="price-descending">Price, high to low</option>
                    <option value="created-ascending">Date, old to new</option>
                    <option value="created-descending">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  {/* <p className="totalproducts mb-0">21 Products</p> */}
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="assets/images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    {/* <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="assets/images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />

                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="assets/images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    /> */}
                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="assets/images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <ProductCard
                  data={productState ? productState : []}
                  grid={grid}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;

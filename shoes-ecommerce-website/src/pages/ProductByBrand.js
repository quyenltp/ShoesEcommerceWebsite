import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Size from "../components/Size";
import Container from "../components/Container";
import {
  getAllProducts,
  getProByBrand,
} from "../features/product/productSlice";

const ProductByBrand = () => {
  const [grid, setGrid] = useState(3);
  const productState = useSelector((state) => state?.product?.product);
  // console.log(productState);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const { brandName } = useParams();

  // Filter States
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [tag, setTag] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newtags = [];
    let newColors = [];
    let newSizes = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newBrands.push(element.brand);
      category.push(element.category);
      newtags.push(element.tags);
      newColors.push(element.color);
      newSizes.push(element.size);
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newtags);
    setColors(newColors);
    setSizes(newSizes);
  }, [productState]);

  const dispatch = useDispatch();
  useEffect(() => {
    setBrand(brandName);
    getProducts();
    setGrid(3);
  }, [sort, brandName, category, tag, minPrice, maxPrice]);
  const getProducts = () => {
    dispatch(
      getAllProducts({
        sort,
        brand: brandName,
        category,
        tag,
        minPrice,
        maxPrice,
      })
    );
  };

  return (
    <>
      {/* <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" /> */}
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p
                    className="mb-0 d-block filter-title"
                    style={{ width: "100px" }}
                  >
                    Sort By:
                  </p>
                  <select
                    name=""
                    defaultValue={"manual"}
                    className="form-control form-select"
                    id=""
                    onChange={(e) => {
                      setSort(e.target.value);
                    }}
                  >
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">Alphabetically, Z-A</option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  {/* <p className="totalproducts mb-0">21 Products</p> */}
                  <div className="d-flex gap-10 align-items-center grid">
                    {/* <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="../assets/images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    /> */}
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
                    {/* <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="../assets/images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  {categories &&
                    [...new Set(categories)].map((item, index) => {
                      const isSelected = item === selectedCategory;
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            if (isSelected && item === selectedCategory) {
                              category &&
                                setCategory(null) &&
                                setSelectedCategory(null);
                            } else {
                              setCategory(item);
                              setSelectedCategory(item);
                            }
                            // handleCategoryClick(item);
                          }}
                        >
                          {item}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                {/* <h5 className="sub-title">Availablity</h5>
                <div>
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
                </div> */}
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">To</label>
                  </div>
                </div>
                {/* <h5 className="sub-title">Color</h5>
                <div>
                  {colors &&
                    [...new Set(colors)].map((item, index) => {
                      return (
                        <Color
                          setColor={setColors}
                          colorData={item}
                          key={index}
                        />
                      );
                    })}
                  <Color />
                </div> */}
                {/* <h5 className="sub-title">Size</h5>
                <div>
                  {sizes &&
                    [...new Set(sizes)].map((item, index) => {
                      return (
                        <Size setSize={setSizes} sizeData={item} key={index} />
                      );
                    })}
                </div> */}
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Brands</h3>
              <div>
                <div className="product-tag d-flex flex-wrap align-items-center gap-10">
                  {brands &&
                    [...new Set(brands)].map((item, index) => {
                      const isSelected = item === selectedBrand;

                      return (
                        <span
                          key={index}
                          onClick={() => {
                            if (isSelected && item === selectedBrand) {
                              brand && setBrand(null) && setSelectedBrand(null);
                            } else {
                              setBrand(item);
                              setSelectedBrand(item);
                            }
                            // handleCategoryClick(item);
                          }}
                          className="badge bg-light text-secondary rounded-3 py-2 px-3"
                        >
                          {item}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tag d-flex flex-wrap align-items-center gap-10">
                  {tags &&
                    [...new Set(tags)].map((item, index) => {
                      const isSelected = item === selectedTag;
                      return (
                        <span
                          key={index}
                          onClick={() => {
                            if (isSelected && item === selectedTag) {
                              tag && setTag(null) && setSelectedTag(null);
                            } else {
                              setTag(item);
                              setSelectedTag(item);
                            }
                            // handleCategoryClick(item);
                          }}
                          className="badge bg-light text-secondary rounded-3 py-2 px-3"
                        >
                          {item}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <ProductCard
                  data={productState ? productState : []}
                  className="col-3"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductByBrand;

import React, { useEffect, useState } from "react";
import ReactImageZoom from "react-image-zoom";
import { AiOutlineHeart } from "react-icons/ai";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import Color from "../components/Color";
import Size from "../components/Size";
import Container from "../components/Container";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAProduct,
  addRating,
  getAllProducts,
} from "../features/product/productSlice";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
const SingleProduct = () => {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [allreadyAdded, setAllreadyAdded] = useState(false);
  const productState = useSelector((state) => state?.product?.singleproduct);
  const productsState = useSelector((state) => state?.product?.product);
  const authState = useSelector((state) => state?.auth);

  const cartState = useSelector((state) => {
    console.log(state);
    return state?.auth?.cartProduct;
  });

  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorChange = (colorId) => {
    setSelectedColor(colorId);
  };

  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeChange = (sizeId) => {
    setSelectedSize(sizeId);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    // for (let index = 0; index <= cartState.length; index++) {
    //   if (cartState[index]?.productId?._id === getProductId) {
    //     setAllreadyAdded(true);
    //   }
    // }
    if (productState && cartState) {
      // Check if cartState is defined
      for (let index = 0; index < cartState?.length; index++) {
        // Change condition to avoid going out of bounds
        if (cartState[index]?.productId?._id === getProductId) {
          setAllreadyAdded(true);
          break; // No need to continue checking once found
        }
      }
    }
    console.log(allreadyAdded);
    console.log(cartState);
  }, [cartState, getProductId]);

  // const uploadCart = () => {
  //   console.log("Adding to cart:", productState?._id, quantity, color);

  //   if (color === "") {
  //     console.log("Color not selected!");
  //     return toast.error("Please select a color");
  //   } else {
  //     dispatch(
  //       addProdToCart({
  //         productId: productState?._id,
  //         quantity,
  //         color,
  //         price: productState?.price,
  //       })
  //     );
  //   }
  // };

  const uploadCart = () => {
    try {
      if (size === "") {
        throw new Error("Please Select A Size!");
      }
      if (color === "") {
        throw new Error("Please Select A Color!");
      }

      dispatch(
        addProdToCart({
          productId: productState?._id,
          quantity,
          color,
          size,
          price: productState?.price,
        })
      );

      // Optionally, reset the form state or perform other actions on success.
      setColor("");
      setSize("");
      setQuantity(1);
    } catch (error) {
      toast.error(error.message);
    }
  };
  // const props = {
  //   width: 400,
  //   height: 500,
  //   zoomWidth: 500,
  //   img: productState?.images[0]?.url
  //     ? productState?.images[0]?.url
  //     : "https://images.vans.com/is/image/Vans/VN0A5JMI_ZS0_HERO?wid=800&hei=1004&fmt=jpeg&qlt=50&resMode=sharp2&op_usm=0.9,1.5,8,0",
  // };

  const props = {
    width: 400,
    height: 500,
    zoomWidth: 500,
    img:
      productState?.images[0]?.url ||
      "https://images.vans.com/is/image/Vans/VN0A5JMI_ZS0_HERO?wid=800&hei=1004&fmt=jpeg&qlt=50&resMode=sharp2&op_usm=0.9,1.5,8,0",
  };

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const [orderedProduct, setOrderedProduct] = useState(true);
  const [specialProduct, setSpecialProduct] = useState([]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < 4; index++) {
      const element = productsState[index];
      if (element?.brand === productState?.brand) {
        data.push(element);
      }
      setSpecialProduct(data);
    }
  }, [productState]);

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Please Select A Star!");
      return false;
    } else if (comment === null) {
      toast.error("Please Write Review About The Product!");
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 100);
    }
    return false;
  };

  return (
    <>
      {/* <Meta title={productState?.title} />
      <BreadCrumb title={productState?.title} /> */}
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {Array.isArray(productState?.images) &&
                productState?.images.slice(1).map((item, index) => {
                  return (
                    <div className="other-image-border d-flex align-items-center justify-content-center">
                      <div key={index}>
                        <img src={item?.url} alt="" className="img-fluid" />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom d-flex justify-content-between">
                <h3 className="title">{productState?.title}</h3>
                <a href="">
                  <AiOutlineHeart size={27} className="fs-5" />
                </a>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ {productState?.price}</p>
                <div className="d-flex align-items-center justify-content-between gap-10">
                  <div className="d-flex align-items-center gap-10">
                    {productState &&
                      productState.ratings?.map((item, index) => {
                        return (
                          <div key={index} className="review">
                            <div className="d-flex gap-10 align-items-center">
                              <ReactStars
                                count={5}
                                size={24}
                                value={item?.star !== null ? item?.star : 0}
                                edit={false}
                                activeColor="#ffd700"
                              />
                              <p className="mb-0">
                                (Based on {productState?.ratings?.length}{" "}
                                review)
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <a
                    className="review-btn text-decoration-underline"
                    href="#review"
                  >
                    Write a Review
                  </a>
                </div>
              </div>
              <div className="pt-3">
                <div className="d-flex gap-10 align-items-center mt-2 mb-3">
                  <h3 className="product-heading">Type:</h3>
                  <p className="product-data">Sneaker</p>
                </div>
                <div className="d-flex gap-10 align-items-center mt-2 mb-3">
                  <h3 className="product-heading">Brand:</h3>
                  <p className="product-data">{productState?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center mt-2 mb-3">
                  <h3 className="product-heading">Categories:</h3>
                  <p className="product-data">{productState?.category}</p>
                </div>
                {/* <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags:</h3>
                  <p className="product-data">{productState?.tags}</p>
                </div> */}
                {/* <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity: </h3>
                  <p className="product-data">In Stock</p>
                </div> */}
                {/* <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size: </h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      36
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      37
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      38
                    </span>
                  </div>
                </div> */}
                {allreadyAdded === false && (
                  <>
                    <div className="d-flex gap-10 flex-column mt-2 mb-2">
                      <h3 className="product-heading">Size: </h3>{" "}
                      <Size
                        setSize={setSize}
                        sizeData={productState?.size}
                        className="size"
                        selectedSize={selectedSize}
                        setSelectedSize={handleSizeChange}
                      />
                    </div>
                    <div className="d-flex gap-10 flex-column mt-2 mb-2">
                      <h3 className="product-heading">Color: </h3>{" "}
                      <Color
                        setColor={setColor}
                        colorData={productState?.color}
                        className="color"
                        selectedColor={selectedColor}
                        setSelectedColor={handleColorChange}
                      />
                    </div>
                  </>
                )}
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {allreadyAdded === false && (
                    <>
                      <h3 className="product-heading">Quantity: </h3>
                      <div className="">
                        <input
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          className="form-control"
                          style={{ width: "70px" }}
                          id=""
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        />
                      </div>
                    </>
                  )}
                  <div
                    className={
                      allreadyAdded
                        ? "ms-0"
                        : "ms-5" + "d-flex align-items-center gap-30 ms-5"
                    }
                  >
                    <button
                      className="button border-0"
                      type="button"
                      // data-bs-toggle="modal"
                      // data-bs-target="#staticBackdrop"
                      onClick={() => {
                        allreadyAdded ? navigate("/cart") : uploadCart();
                      }}
                    >
                      {allreadyAdded ? "Go To Cart" : "Add To Cart"}
                    </button>
                    {/* <button className="button signup">Buy now</button> */}
                  </div>
                </div>
                {/* <div className="d-flex align-items-center gap-15">
                  <a href="">
                    <AiOutlineHeart className="fs-5 me-2" />
                    Add to Wishlist
                  </a>
                </div> */}
                <div className="d-flex flex-column gap-10 mt-4 mb-3">
                  <h3 className="product-heading">Shipping & Returns: </h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br />
                    We ship all VN domestic orders within 5-10 business days!
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center">
                  <h3 className="product-heading">Product Link:</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(window.location.href);
                    }}
                    style={{ fontSize: "16px" }}
                  >
                    Copy Product Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="description-wrapper pb-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="description-box bg-white p-3">
              <p
                dangerouslySetInnerHTML={{
                  __html: productState?.description || "empty",
                }}
              ></p>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="reviews-wrapper home-wrapper-2 pb-5">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex align-items-end justify-content-between">
                <div>
                  {productState &&
                    productState.ratings?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="review d-flex align-items-center"
                        >
                          <div className="d-flex gap-10 align-items-center">
                            <ReactStars
                              count={5}
                              size={24}
                              value={item?.star}
                              edit={false}
                              activeColor="#ffd700"
                            />
                          </div>
                          <p className="mb-0 ps-2">
                            (Based on {productState?.ratings?.length} review)
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    edit={true}
                    activeColor="#ffd700"
                    onChange={(e) => setStar(e)}
                  />
                </div>
                <textarea
                  name=""
                  id=""
                  className="w-100 form-control"
                  cols="30"
                  rows="4"
                  placeholder="Comment"
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <div className="d-flex justify-content-end mt-3">
                  <button
                    onClick={addRatingToProduct}
                    className="button border-0"
                    type="button"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
              <div className="reviews mt-4">
                {productState &&
                  productState.ratings?.map((item, index) => {
                    return (
                      <div key={index} className="review">
                        <p className="fw-bold mb-0">
                          {authState?.user?.lastname}
                        </p>
                        <div className="d-flex gap-10 align-items-center">
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.star}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p>{item?.comment}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Relevant Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard data={specialProduct} />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;

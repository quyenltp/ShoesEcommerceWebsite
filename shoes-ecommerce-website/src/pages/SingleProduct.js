import React, { useEffect, useState } from "react";
import ReactImageZoom from "react-image-zoom";
import { AiOutlineHeart } from "react-icons/ai";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import Color from "../components/Color";
import Container from "../components/Container";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAProduct } from "../features/product/productSlice";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
const SingleProduct = () => {
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [allreadyAdded, setAllreadyAdded] = useState(false);
  const productState = useSelector((state) => state.product?.singleproduct);
  const cartState = useSelector((state) => {
    console.log(state);
    return state.auth?.cartProduct;
  });

  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
  }, []);
  useEffect(() => {
    // for (let index = 0; index <= cartState.length; index++) {
    //   if (cartState[index]?.productId?._id === getProductId) {
    //     setAllreadyAdded(true);
    //   }
    // }
    if (productState && cartState) {
      // Check if cartState is defined
      for (let index = 0; index < cartState.length; index++) {
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
      if (color === "") {
        throw new Error("Please select a color");
      }

      dispatch(
        addProdToCart({
          productId: productState?._id,
          quantity,
          color,
          price: productState?.price,
        })
      );

      // Optionally, reset the form state or perform other actions on success.
      setColor("");
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
  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {Array.isArray(productState?.images[0]) &&
                productState?.images[0]?.map((item, index) => {
                  return (
                    <div>
                      <img src={item?.url} alt="" className="img-fluid" />
                    </div>
                  );
                })}
              <div>
                <img
                  src="https://images.vans.com/is/image/Vans/VN0A5JMI_ZS0_HERO?wid=800&hei=1004&fmt=jpeg&qlt=50&resMode=sharp2&op_usm=0.9,1.5,8,0"
                  alt=""
                  className="img-fluid"
                />
              </div>
              {/* <div>
                <img
                  src="https://images.vans.com/is/image/Vans/VN0A5JMI_ZS0_HERO?wid=800&hei=1004&fmt=jpeg&qlt=50&resMode=sharp2&op_usm=0.9,1.5,8,0"
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div>
                <img
                  src="https://images.vans.com/is/image/Vans/VN0A5JMI_ZS0_HERO?wid=800&hei=1004&fmt=jpeg&qlt=50&resMode=sharp2&op_usm=0.9,1.5,8,0"
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div>
                <img
                  src="https://images.vans.com/is/image/Vans/VN0A5JMI_ZS0_HERO?wid=800&hei=1004&fmt=jpeg&qlt=50&resMode=sharp2&op_usm=0.9,1.5,8,0"
                  alt=""
                  className="img-fluid"
                />
              </div> */}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">{productState?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={productState?.totalratings}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">(2 reviews)</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className="py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type:</h3>
                  <p className="product-data">Sneaker</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand:</h3>
                  <p className="product-data">{productState?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Categories:</h3>
                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags:</h3>
                  <p className="product-data">{productState?.tags}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity: </h3>
                  <p className="product-data">In Stock</p>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
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
                </div>
                {allreadyAdded === false && (
                  <>
                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                      <h3 className="product-heading">Color: </h3>{" "}
                      <Color
                        setColor={setColor}
                        colorData={productState?.color}
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
                <div className="d-flex align-items-center gap-15">
                  <a href="">
                    <AiOutlineHeart className="fs-5 me-2" />
                    Add to Wishlist
                  </a>
                </div>
                <div className="d-flex flex-column gap-10 my-3">
                  <h3 className="product-heading">Shipping & Returns: </h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br />
                    We ship all VN domestic orders within 5-10 business days!
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link:</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(window.location.href);
                    }}
                  >
                    Copy Product Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{
                  __html: productState?.description || "empty",
                }}
              ></p>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex align-items-end justify-content-between">
                <div>
                  <h4 classNames="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value="3"
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value="3"
                      edit={true}
                      activeColor="#ffd700"
                    />
                  </div>
                  <textarea
                    name=""
                    id=""
                    className="w-100 form-control"
                    cols="30"
                    rows="4"
                    placeholder="Comment"
                  ></textarea>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0">Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                <div className="review">
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">Navdeep</h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value="3"
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;

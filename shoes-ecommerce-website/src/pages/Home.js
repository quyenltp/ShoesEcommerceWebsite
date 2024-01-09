import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowRoundForward,
} from "react-icons/io";

import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import wish from "../assets/images/wish.svg";
import addcart from "../assets/images/add-cart.svg";
import view from "../assets/images/view.svg";
import product01 from "../assets/images/softride-sophia-2.jpg";
import { addToWishlist } from "../features/product/productSlice";
import { getAllProducts } from "../features/product/productSlice";
import { getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state.product.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getblogs();
    getallProducts();
  }, []);

  const getblogs = () => {
    dispatch(getAllBlogs());
  };

  const getallProducts = () => {
    dispatch(getAllProducts());
  };

  const addToWish = (id) => {
    // alert(id);
    dispatch(addToWishlist(id));
  };

  const truncateProductTitle = (text) => {
    if (text.length > 17) {
      return text.substring(0, 17) + "...";
    }
    return text;
  };

  const truncateBlogTitle = (text) => {
    if (text.length > 25) {
      return text.substring(0, 25) + "...";
    }
    return text;
  };

  const truncateBlogDescription = (text) => {
    if (text.length > 60) {
      return text.substring(0, 60) + "...";
    }
    return text;
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPIndex, setCurrentPIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Auto play, incrementing the current index
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogState.length);
    }, 5000); // Change the interval as needed (in milliseconds)

    return () => clearInterval(interval);
  }, [blogState.length]);

  useEffect(() => {
    const intervalP = setInterval(() => {
      // Auto play, incrementing the current index
      setCurrentPIndex((prevIndex) => (prevIndex + 1) % productState.length);
    }, 5000); // Change the interval as needed (in milliseconds)

    return () => clearInterval(intervalP);
  }, [productState.length]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current, next) => setCurrentIndex(next),
  };
  const settingsPopuplar = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current, next) => setCurrentPIndex(next),
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <IoIosArrowForward
        className={className}
        style={{
          ...style,
          display: "block",
          // background: "var(--secondary-color)",
          borderRadius: "50%",
          color: "var(--secondary-color)",
          width: "35px",
          height: "35px",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <IoIosArrowBack
        className={className}
        style={{
          ...style,
          display: "block",
          // background: "var(--secondary-color)",
          borderRadius: "50%",
          color: "var(--secondary-color)",
          width: "35px",
          height: "35px",
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-8">
            <div className="main-banner position-relative py-3">
              <img
                src="assets/images/main-banner-1.jpeg"
                className="img-fluid rounded-3"
                alt="main-banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>Available Now</h4>
                <h5>
                  Converse X <br /> COMME Des <br /> GARCONS PLAY
                </h5>
                <p>
                  For thoes who follow their <br /> heart - new colours on the{" "}
                  <br />
                  playful multi-heart Chuck 70
                </p>
                <Link className="button" to="/product">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="small-banner p-3">
              <img
                src="assets/images/cat-banner.jpg"
                className="img-fluid rounded-3"
                alt="cat-banner"
              />
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services?.map((item, index) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={index}>
                    <img src={item.image} alt="services" />
                    <div>
                      <h6>{truncateProductTitle(item.title)}</h6>
                      <p className="mb-0">{item.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      {/* <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex align-items-center gap-30">
                <div>
                  <h6>Chucks</h6>
                  <p>10 Items</p>
                </div>
                <img src="assets/images/chuck-taylor.jpg" alt="" />
              </div>
              <div className="d-flex align-items-center gap-30">
                <div>
                  <h6>Classic</h6>
                  <p>10 Items</p>
                </div>
                <img src="assets/images/classic.jpg" alt="" />
              </div>
              <div className="d-flex align-items-center gap-30">
                <div>
                  <h6>Old Skool</h6>
                  <p>10 Items</p>
                </div>
                <img src="assets/images/old-skool.jpg" alt="" />
              </div>
              <div className="d-flex align-items-center gap-30">
                <div>
                  <h6>Air Jordan</h6>
                  <p>10 Items</p>
                </div>
                <img src="assets/images/air-jordan.jpg" alt="" />
              </div>

              <div className="d-flex align-items-center gap-30">
                <div>
                  <h6>Chucks</h6>
                  <p>10 Items</p>
                </div>
                <img src="assets/images/chuck-taylor.jpg" alt="" />
              </div>
              <div className="d-flex align-items-center gap-30">
                <div>
                  <h6>Classic</h6>
                  <p>10 Items</p>
                </div>
                <img src="assets/images/classic.jpg" alt="" />
              </div>
              <div className="d-flex align-items-center gap-30">
                <div>
                  <h6>Old Skool</h6>
                  <p>10 Items</p>
                </div>
                <img src="assets/images/old-skool.jpg" alt="" />
              </div>
              <div className="d-flex align-items-center gap-30">
                <div>
                  <h6>Air Jordan</h6>
                  <p>10 Items</p>
                </div>
                <img src="assets/images/air-jordan.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      <Container class1="marquee-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="assets/images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="assets/images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="assets/images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="assets/images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="assets/images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="assets/images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="assets/images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="assets/images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "featured") {
                return (
                  <div key={index} className={"col-2 mb-3"}>
                    <Link to={`/product/${item?._id}`}>
                      <div className="product-card position-relative">
                        <div className="wishlist-icon position-absolute">
                          <button
                            className="border-0 bg-transparent"
                            onClick={(e) => addToWish(item?._id)}
                          >
                            <img
                              src={wish}
                              alt="wishlist"
                              style={{ width: "20px" }}
                            />
                          </button>
                        </div>
                        <div className="product-image">
                          <img
                            src={item?.images[0]?.url}
                            // src={product01}
                            className="img-fluid mx-auto"
                            alt="product image"
                          />
                          {/* Hover image */}
                          <img
                            src={item?.images[0]?.url}
                            className="img-fluid mx-auto"
                            alt="product image"
                          />
                          {/* <img src={product01} alt="" /> */}
                        </div>
                        <div className="product-details">
                          <h6 className="brand">{item?.brand}</h6>
                          <h5 className="product-title">
                            {truncateProductTitle(item?.title)}
                          </h5>
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.totalrating.toString()}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          <p className="price">$ {item?.price}</p>
                        </div>
                        {/* <div className="action-bar position-absolute">
                        <div className="d-flex flex-column">
                          <Link
                            to={`/product/${item?._id}`}
                            className="border-0 bg-transparent"
                          >
                            <img src={view} alt="view" />
                          </Link>
                          <button className="border-0 bg-transparent">
                            <img src={addcart} alt="addcart" />
                          </button>
                        </div>
                      </div> */}
                      </div>
                    </Link>
                  </div>
                );
              }
            })}
        </div>
      </Container>
      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <img
              src="assets/images/famous001.avif"
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-3">
            <img
              src="assets/images/famous002.avif"
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-3">
            <img
              src="assets/images/famous003.avif"
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-3">
            <img
              src="assets/images/famous001.avif"
              className="img-fluid"
              alt=""
            />
          </div>
        </div>
      </Container>
      {/* <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "special") {
                return (
                  <SpecialProduct
                    key={index}
                    brand={item?.brand}
                    title={item?.title}
                    totalrating={item?.totalrating.toString()}
                    price={item?.price}
                    sold={item?.sold}
                    quantity={item?.quantity}
                    images={item?.images[0]?.url}
                  />
                );
              }
            })}
        </div>
      </Container> */}
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <Slider {...settingsPopuplar}>
            {productState &&
              productState?.map((item, index) => {
                if (item.tags === "popular") {
                  return (
                    <div key={index} className={"col-2 mb-3"}>
                      <Link to={`/product/${item?._id}`}>
                        <div
                          // to={`${
                          //   location.pathname == "/"
                          //     ? "/product/:id"
                          //     : location.pathname == "/product/:id"
                          //     ? "/product/:id"
                          //     : ":id"
                          // }`}
                          className="product-card position-relative"
                        >
                          <div className="wishlist-icon position-absolute">
                            <button
                              className="border-0 bg-transparent"
                              onClick={(e) => addToWish(item?._id)}
                            >
                              <img
                                src={wish}
                                alt="wishlist"
                                style={{ width: "20px" }}
                              />
                            </button>
                          </div>
                          <div className="product-image">
                            <img
                              src={item?.images[0]?.url}
                              // src={product01}
                              className="img-fluid mx-auto"
                              alt="product image"
                            />
                            {/* Hover image */}
                            <img
                              src={item?.images[0]?.url}
                              className="img-fluid mx-auto"
                              alt="product image"
                            />
                            {/* <img
                          src={product01}
                          alt=""
                          className="img-fluid mx-auto"
                        />
                        <img
                          src={product01}
                          alt=""
                          className="img-fluid mx-auto"
                        /> */}
                          </div>
                          <div className="product-details">
                            <h6 className="brand">{item?.brand}</h6>
                            <h5 className="product-title">
                              {truncateProductTitle(item?.title)}
                            </h5>
                            <ReactStars
                              count={5}
                              size={24}
                              value={item?.totalrating.toString()}
                              edit={false}
                              activeColor="#ffd700"
                            />
                            <p className="price">$ {item?.price}</p>
                          </div>
                          {/* <div className="action-bar position-absolute">
                        <div className="d-flex flex-column">
                          <Link
                            to={`/product/${item?._id}`}
                            className="border-0 bg-transparent"
                          >
                            <img src={view} alt="view" />
                          </Link>
                          <button className="border-0 bg-transparent">
                            <img src={addcart} alt="addcart" />
                          </button>
                        </div>
                      </div> */}
                        </div>
                      </Link>
                    </div>
                  );
                }
              })}
          </Slider>
        </div>
      </Container>
      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          <Slider {...settings}>
            {blogState &&
              Object.keys(blogState).map((key, index) => {
                const item = blogState[key];
                const imageUrl =
                  item?.image && item.image.length > 0
                    ? item.images[0].url
                    : "assets/images/blog-01.jpg";
                return (
                  <div className="col-3 px-2" key={index}>
                    <BlogCard
                      id={item?._id}
                      title={truncateBlogTitle(item?.title)}
                      image={item?.images[0]?.url}
                      description={truncateBlogDescription(item?.description)}
                      date={moment(item?.createdAt).format("LLL")}
                    />
                  </div>
                );
              })}
          </Slider>
        </div>
      </Container>
    </>
  );
};
export default Home;

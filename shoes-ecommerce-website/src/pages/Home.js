import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";

import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";

import moment from "moment";

const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const dispatch = useDispatch();
  useEffect(() => {
    getblogs();
  }, []);
  const getblogs = () => {
    dispatch(getAllBlogs());
  };
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
                <Link className="button">Shop Now</Link>
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
                      <h6>{item.title}</h6>
                      <p className="mb-0">{item.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
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
      </Container>
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
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>
      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <img
              src="assets/images/famous-01.avif"
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-3">
            <img
              src="assets/images/famous-02.avif"
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-3">
            <img
              src="assets/images/famous-01.avif"
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-3">
            <img
              src="assets/images/famous-02.avif"
              className="img-fluid"
              alt=""
            />
          </div>
        </div>
      </Container>
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
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
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>
      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          {blogState &&
            Object.keys(blogState).map((key, index) => {
              const item = blogState[key];
              const imageUrl =
                item?.image && item.image.length > 0
                  ? item.images[0].url
                  : "assets/images/blog-01.jpg";
              if (index < 4) {
                return (
                  <div className="col-3" key={index}>
                    <BlogCard
                      title={item.title}
                      image={imageUrl}
                      description={item.description}
                    />
                  </div>
                );
              }
            })}
        </div>
      </Container>
    </>
  );
};
export default Home;

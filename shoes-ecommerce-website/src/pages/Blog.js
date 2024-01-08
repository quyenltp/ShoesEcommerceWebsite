import React, { useEffect } from "react";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment";
const Blog = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const dispatch = useDispatch();
  useEffect(() => {
    getblogs();
  }, []);
  const getblogs = () => {
    dispatch(getAllBlogs());
  };
  const truncateBlogTitle = (text) => {
    if (text.length > 45) {
      return text.substring(0, 45) + "...";
    }
    return text;
  };

  const truncateBlogDescription = (text) => {
    if (text.length > 70) {
      return text.substring(0, 70) + "...";
    }
    return text;
  };
  return (
    <>
      {/* <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" /> */}
      <Container class1="blog-wrapper home-wrapper-2 py-3">
        <div className="row">
          {/* <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Find By Categories</h3>
              <div>
                <ul className="ps-0">
                  <li>Home</li>
                  <li>Our Store</li>
                  <li>Blogs</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
          </div> */}
          <h3 className="p-4 text-center">All Blogs</h3>
          <div className="col-12 container">
            <div className="row">
              {/* {Object.keys(blogState)?.map((item, index) => {
                return (
                  <div className="col-6 mb-3" key={index}>
                    <BlogCard
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
                      image={item?.image?.url}
                      date={moment(item?.createdAt).format("LLL")}
                    />
                  </div>
                );
              })} */}
              {blogState &&
                Object.keys(blogState).map((key, index) => {
                  const item = blogState[key];
                  const imageUrl =
                    item?.image && item.image.length > 0
                      ? item.images[0].url
                      : "assets/images/blog-01.jpg";
                  return (
                    <div className="col-md-3 mb-3" key={index}>
                      <BlogCard
                        id={item?._id}
                        title={truncateBlogTitle(item?.title)}
                        description={truncateBlogDescription(item?.description)}
                        image={item?.images[0]?.url}
                        date={moment(item?.createdAt).format("LLL")}
                      />
                    </div>
                  );
                })}

              {/* <div className="col-6 mb-3">
                <BlogCard />
              </div>
              <div className="col-6 mb-3">
                <BlogCard />
              </div>
              <div className="col-6 mb-3">
                <BlogCard />
              </div> */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;

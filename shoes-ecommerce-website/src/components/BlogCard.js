import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img
          src="assets/images/blog-01.jpg"
          className="img-fluid w-100"
          alt="blog"
        />
      </div>
      <div className="blog-content">
        <p className="date">11 Oct, 2023</p>
        <h5 className="title">New Product: Converse Run Star</h5>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </p>
        <Link className="button" to="/blog/:id">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;

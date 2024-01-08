import React from "react";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
  const { image, date, title, description, id } = props;
  return (
    <div className="blog-card">
      <div className="card-image">
        <img
          src={image ? image : "assets/images/blog-01.jpg"}
          className="w-100"
          alt="blog"
        />
      </div>
      <div className="blog-content">
        <p className="date">{date}</p>
        <Link to={"/blog/" + id}>
          <h5 className="title">{title}</h5>
        </Link>
        <p
          className="desciption"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></p>
        <Link className="button" to={"/blog/" + id}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;

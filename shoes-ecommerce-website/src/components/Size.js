import React from "react";

const Size = (props) => {
  const { sizeData, setSize } = props;
  return (
    <>
      <ul className="sizes ps-0 ">
        {sizeData &&
          sizeData?.map((item, index) => {
            return (
              <span
                className="badge border border-1 bg-white text-dark border-secondary"
                onClick={() => setSize(item?._id)}
                style={{ marginRight: "10px" }}
                key={index}
              >
                {item?.title}
              </span>
            );
          })}
      </ul>
      {/* <div className="d-flex flex-wrap gap-15 ">
        {sizeData &&
          sizeData?.map((item, index) => {
            return (
              <span
                className="badge border border-1 bg-white text-dark border-secondary"
                onClick={() => setSize(item?._id)}
                style={{ backgroundColor: "white" }}
                key={index}
              ></span>
            );
          })}
      </div> */}
    </>
  );
};

export default Size;

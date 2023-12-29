import React from "react";

const Size = (props) => {
  const { sizeData, selectedSize, setSize, setSelectedSize } = props;
  return (
    <>
      <ul className="sizes ps-0 ">
        {sizeData &&
          sizeData?.map((item, index) => {
            const isSelected = item?._id === selectedSize;

            return (
              <span
                // className="badge border border-1 bg-white text-dark border-secondary "
                className={
                  isSelected
                    ? "selected-size badge bg-white text-dark"
                    : "badge border border-1 bg-white text-dark"
                }
                onClick={() => {
                  setSize(item?._id);
                  setSelectedSize(item?._id);
                }}
                style={{ marginRight: "10px", position: "relative" }}
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

import React from "react";

const Color = (props) => {
  const { colorData, selectedColor, setColor, setSelectedColor } = props;

  return (
    <>
      <ul className="colors ps-0">
        {colorData &&
          colorData.map((item, index) => {
            const isSelected = item?._id === selectedColor;

            return (
              <li
                onClick={() => {
                  setColor(item?._id);
                  setSelectedColor(item?._id);
                }}
                style={{
                  backgroundColor: item?.title,
                  border: "1px solid",
                  position: "relative",
                }}
                className={isSelected ? "selected-color" : ""}
                key={index}
              >
                {isSelected && <div className="selection-circle"></div>}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Color;

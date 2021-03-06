import React from "react";

const Square = (props) => {
  const className = "square " + (props.winningInfo ? "highlight" : "");

  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
};
export default Square;

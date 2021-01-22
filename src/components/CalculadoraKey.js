import React from "react";
import "./CalculadoraKey.css";

function CalculadoraKey(props) {
  return (
    <button
      className={`${props.className}`}
      onClick={() => props.onClick(props.keyValue)}
    >
      {props.keyValue}{" "}
    </button>
  );
}

export default CalculadoraKey;
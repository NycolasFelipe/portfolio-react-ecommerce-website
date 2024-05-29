import React from "react";
import "./Button.css";

export const Button = ({ text = "Button", disabled = false }) => {
  return (
    <button className={`btn ${disabled ? " disabled" : ""}`}>{text}</button>
  );
}

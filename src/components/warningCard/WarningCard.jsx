import React from "react";
import { MdReportGmailerrorred } from "react-icons/md";
import "./WarningCard.css";

export const WarningCard = ({ title, message }) => {
  return (
    <div className="warning_card">
      <div className="container">
        <div className="warning_title">
          <div className="icon">
            <MdReportGmailerrorred />
          </div>
          <span>
            {title}
          </span>
        </div>
        <p className="warning_text">
          {message}
        </p>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import "./IconBox.css";

export const IconBox = (title, icon, link) => {
  // Exemplo: IconBox("GitHub", <FaGithub />, "https://github.com/NycolasFelipe")
  let colorClass;
  switch (title) {
    case "HTML5": colorClass = "html5";
      break;
    case "CSS3": colorClass = "css3";
      break;
    case "JavaScript": colorClass = "javascript";
      break;
    case "React": colorClass = "react";
      break;
    case "Auth0": colorClass = "auth0";
      break;
    case "Node.js": colorClass = "nodejs";
      break;
    case "Express": colorClass = "express";
      break;
    case "MySQL": colorClass = "mysql";
      break;
    case "Vercel": colorClass = "vercel";
      break;
  }

  return (
    <Link className={`link ${colorClass}`} target="_blank" to={link}>
      <div className="link-box">
        <span className="icon">{icon}</span>
        <p className="title">{title}</p>
      </div>
    </Link>
  );
}

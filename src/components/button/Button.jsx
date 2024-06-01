import React, { useState } from "react";
import "./Button.css";

export const Button = ({ initialText = "Button", newText = "", disabled = false, onClick }) => {
  const [text, setText] = useState(initialText);
  const updateText = (e) => {
    // Anima botão somente se usuário estiver logado
    const button = e.target;

    // Atualiza texto do botão
    setText(newText);

    // Adiciona classe p/ animação
    button.classList.add("btn-animate");

    setTimeout(() => {
      setText(initialText);
      button.classList.remove("btn-animate");
    }, 2000);

  }

  return (
    <button onClick={(e) => { onClick(); updateText(e) }} className={`btn ${disabled ? " disabled" : ""}`}>{text}</button>
  );
}

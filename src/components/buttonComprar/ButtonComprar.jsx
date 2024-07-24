import React, { useState } from "react";
import "./ButtonComprar.css";

export const ButtonComprar = ({
  initialText = "Comprar",
  buyText = "Adicionado",
  disabled = false,
  disabledText = "Indisponível",
  redirect = false,
  onClick = () => {},
}) => {
  const [text, setText] = useState(initialText);
  const updateText = (e) => {
    // Anima botão somente se usuário estiver logado
    if (!redirect) {
      const button = e.target;

      // Atualiza texto do botão
      setText(buyText);

      // Adiciona classe p/ animação
      button.classList.add("btn-animate");

      setTimeout(() => {
        setText(initialText);
        button.classList.remove("btn-animate");
      }, 2000);
    }
  }

  return (
    <button 
      className={`btn-comprar ${disabled ? " disabled" : ""}`} 
      onClick={(e) => {updateText(e); onClick()}}
      >
      {disabled ? disabledText : text}
    </button>
  );
}

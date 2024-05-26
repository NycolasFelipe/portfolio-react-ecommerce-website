import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import "./Footer.css";

export const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="about">
            <div className="logo">
              <img src="../img/logo.svg" alt="Logo" />
            </div>
            <div className="detail">
              <p>Website criado por Nycolas Felipe &#169; 2024</p>
              <div className="icon">
                <li><a target="_blank" rel="noreferrer" href="https://github.com/NycolasFelipe"><FaGithub /></a></li>
                <li><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/nycolas-felipe/"><FaLinkedin /></a></li>
                <li><a target="_blank" rel="noreferrer" href="mailto:nycolasfelipe.contato@gmail.com"><SiGmail /></a></li>
              </div>
            </div>
          </div>
          <div className="account">
            <h3>Minha conta</h3>
            <ul>
              <li>Conta</li>
              <li>Pedido</li>
              <li>Carrinho</li>
              <li>Entrega</li>
              <li>Devolução</li>
            </ul>
          </div>
          <div className="page">
            <h3>Páginas</h3>
            <ul>
              <li>Início</li>
              <li>Sobre</li>
              <li>Contato</li>
              <li>Termos & Condições</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

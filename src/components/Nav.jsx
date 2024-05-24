import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { FaTruckMoving } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import "./Nav.css";

const Nav = ({ search, setSearch, searchButton }) => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <>
      <div className="free">
        <div className="icon"><FaTruckMoving /></div>
        <p>Frete grátis em compras acima de R$100,00</p>
      </div>
      <div className="main-header">
        <div className="container">
          <div className="logo">
            <Link to="/"><img src="../img/logo.svg" alt="Logo" /></Link>
          </div>
          <div className="search-box">
            <input
              type="text"
              value={search}
              name="searchBox"
              id="searchBox"
              placeholder="Procure um produto..."
              autoComplete="off"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-button-desktop" type="button" onClick={() => searchButton(search)}><IoSearch className="search-icon" /> Pesquisar</button>
            <button className="search-button-mobile" type="button" onClick={() => searchButton(search)}><IoSearch /></button>
          </div>
          <div className="icon">
            {
              isAuthenticated && (
                <div className="account">
                  <div className="user-icon">
                    <AiOutlineUser />
                  </div>
                  <p>Olá, {user.name}</p>
                </div>
              )
            }
            <div className="second-icon">
              <Link to="/" className="link">
                <AiOutlineHeart />
              </Link>
              {
                isAuthenticated ? (
                  <Link to="/cart" className="link">
                    <BsBagCheck />
                  </Link>
                ) : (
                  <Link onClick={() => loginWithRedirect()} className="link">
                    <BsBagCheck />
                  </Link>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="container">
          <div className="nav">
            <ul>
              <li><Link className="link" to="/">Início</Link></li>
              <li><Link className="link" to="/products">Produtos</Link></li>
              <li><Link className="link" to="/about">Sobre</Link></li>
              <li><Link className="link" to="/contact">Contato</Link></li>
            </ul>
          </div>
          <div className="auth">
            {
              isAuthenticated ?
                <button title="Log out" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} type="button"><span>Sair</span><CiLogout className="auth-button-icon" /></button>
                :
                <button title="Login" onClick={() => loginWithRedirect()} type="button"><span>Entrar</span><CiLogin className="auth-button-icon" /></button>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
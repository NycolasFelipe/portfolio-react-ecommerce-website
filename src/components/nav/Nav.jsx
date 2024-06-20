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
import styles from "./Nav.module.css";

export const Nav = ({ search, setSearch, searchButton }) => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const searchOnEnter = (e) => {
    if (e.key === "Enter") {
      searchButton(search);
      e.target.blur();
    }
  }

  return (
    <>
      <div className={styles.free_shipping}>
        <div className={styles.icon}><FaTruckMoving /></div>
        <p>Frete grátis em compras acima de R$100,00</p>
      </div>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link to="/"><img src="../img/logo.svg" alt="Logo" /></Link>
          </div>
          <div className={styles.search_box}>
            <input
              type="text"
              value={search}
              name="searchBox"
              id="searchBox"
              placeholder="Pesquise um produto..."
              autoComplete="off"
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={(e) => searchOnEnter(e)}
            />
            <button
              className={styles.search_btn}
              type="button"
              onClick={() => searchButton(search)}>
              <IoSearch className={styles.icon} />
              <span className={styles.label}>Pesquisar</span>
            </button>
          </div>
        </div>
        <div className={styles.side}>
          <div className={styles.account}>
            {isAuthenticated && (
              <Link to="/account" >
                <AiOutlineUser className={styles.icon} />
                <p>Olá, {user.given_name}</p>
              </Link>
            )}
          </div>
          <div className={styles.favorites}>
            {isAuthenticated ? (
              <Link to="/favorites">
                <AiOutlineHeart className={styles.icon} />
              </Link>
            ) : (
              <Link onClick={() => loginWithRedirect()}>
                <AiOutlineHeart className={styles.icon} />
              </Link>
            )}
          </div>
          <div className={styles.cart}>
            {isAuthenticated ? (
              <Link to="/cart">
                <BsBagCheck className={styles.icon} />
              </Link>
            ) : (
              <Link onClick={() => loginWithRedirect()}>
                <BsBagCheck className={styles.icon} />
              </Link>
            )}
          </div>
        </div>
      </header>
      <div className={styles.navigation}>
        <nav>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/products">Produtos</Link></li>
            <li><Link to="/about">Sobre</Link></li>
            <li><Link to="/contact">Contato</Link></li>
          </ul>
        </nav>
        <div className={styles.login}>
          {isAuthenticated ?
            <button
              title="Log out"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              type="button">
              <span>Sair</span>
              <CiLogout className={styles.icon} />
            </button>
            :
            <button
              title="Login"
              onClick={() => loginWithRedirect()} type="button">
              <span>Entrar</span><CiLogin className={styles.icon} />
            </button>
          }
        </div>
      </div>
    </>
  );
}

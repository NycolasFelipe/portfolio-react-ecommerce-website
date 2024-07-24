import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { IoChevronForwardSharp, IoHeartDislikeOutline, IoHeartOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import formatMoney from "../../scripts/formatMoney";
import styles from "./Favorites.module.css";

export const Favorites = ({ favorites, addFavorite }) => {
  const { user } = useAuth0();

  return (
    <>
      <div className={styles.favorites}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.contant}>
              <h2><AiOutlineHeart className={styles.icon} /> Favoritos</h2>
              <p><Link to="/" className={styles.link}>Início <IoChevronForwardSharp className={styles.chevron} /></Link></p>
              <p>Favoritos</p>
            </div>
          </div>
          <div className={styles.greetings}>
            <h2>Olá, {user.given_name}!</h2>
            {favorites.length > 0 ? (
              <>
                <h3>Esses são seus produtos favoritos.</h3>
                <div className={styles.content}></div>
              </>
            ) : (
              <h3>Você não possui produtos favoritos :(</h3>
            )}
          </div>
          {favorites.length > 0 && (
            <div className={styles.products}>
              {favorites?.map((curElm, index) => {
                return (
                  <div key={index} className={styles.product}>
                    <div className={styles.product_img}>
                      <Link to={"/products/detail?productId=" + curElm.ProductId}>
                        <img src={curElm.Img} alt={curElm.Title} />
                      </Link>
                    </div>
                    <div className={styles.product_detail}>
                      <Link to={"/products/detail?productId=" + curElm.ProductId}>
                        <h4 className={styles.title}>{curElm.Title}</h4>
                        <p className={styles.price}>{formatMoney(curElm.Price)}</p>
                      </Link>
                    </div>
                    <div className={styles.product_interact}>
                      <button type="button" className={styles.remove_favorite} onClick={() => addFavorite(curElm)}>
                        <IoHeartOutline className={styles.liked} />
                        <IoHeartDislikeOutline className={styles.deslike} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

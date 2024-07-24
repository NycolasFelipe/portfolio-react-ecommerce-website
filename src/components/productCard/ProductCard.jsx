import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ButtonComprar } from "../buttonComprar/ButtonComprar";
import formatMoney from "../../scripts/formatMoney";
import styles from "./ProductCard.module.css";

export const ProductCard = ({ product, addToCart, favorites, addFavorite }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [favoriteProduct, setFavoriteProduct] = useState(false);
  const navigate = useNavigate();

  const navigateDetail = (e, productId) => {
    const url = window.location.pathname;
    // Prevent event bubbling
    if (e.target.nodeName !== "P") {
      if (url.includes("products")) {
        // Navegar para produtos a partir da página de produtos
        navigate(`detail?productId=${productId}`);
      } else {
        // Navegar para produtos a partir da home
        navigate(`products/detail?productId=${productId}`);
      }
      window && window.scroll(0, 0);
    }
  }

  // Determina se este produto é um produto favoritado
  const favoriteThisProduct = (items) => {
    if (items?.length > 0) {
      const isFavorite = items?.filter((curElm) => curElm.ProductId === product.ProductId).length > 0;
      if (isFavorite) {
        setFavoriteProduct(true);
      }
    }
  }

  useEffect(() => {
    favoriteThisProduct(favorites);
  }, [favorites]);

  return (
    <div className={styles.product_card}>
      <div className={styles.img_box} onClick={(e) => navigateDetail(e, product.ProductId)}>
        <img loading="lazy" src={product.Img} alt={product.Title} />
        <div className={styles.icon}>
          {isAuthenticated ?
            <p
              onClick={() => { addFavorite(product); setFavoriteProduct(prev => !prev) }}
              title="Favoritar">
              {favoriteProduct ? <AiFillHeart className={styles.favorite} /> : <AiOutlineHeart />}
            </p> :
            <p onClick={() => loginWithRedirect()} title="Favoritar"><AiOutlineHeart /></p>
          }
        </div>
      </div>
      <div className={styles.detail} onClick={(e) => navigateDetail(e, product.ProductId)}>
        <p>{product.Category}<span className={styles.favorite}>{favoriteProduct && <AiFillHeart />}</span></p>
        <h3 title={product.Title}>{product.Title}</h3>
        <h4>{formatMoney(product.Price)}</h4>
      </div>
      <div className={styles.detail_button}>
        <ButtonComprar onClick={() => addToCart(product)} />
      </div>
    </div>
  );
}

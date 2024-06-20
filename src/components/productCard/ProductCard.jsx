import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import formatMoney from "../../scripts/formatMoney";
import addCartAnimation from "../../scripts/addCartAnimation";
import "./ProductCard.css";

export const ProductCard = ({ product, addToCart, viewProduct, favorites, addFavorite }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [favoriteProduct, setFavoriteProduct] = useState(false);
  const navigate = useNavigate();

  const navigateDetail = (e, productId) => {
    const url = window.location.pathname;
    // Prevent event bubbling
    if (e.target.nodeName !== "LI") {
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
    <div className="product-card" onClick={(e) => navigateDetail(e, product.ProductId)}>
      <div className="img-box">
        <img loading="lazy" src={product.Img} alt={product.Title} />
        <div className="icon">
          {isAuthenticated ?
            <li
              className="button-product"
              onClick={(e) => { addToCart(product); addCartAnimation(e) }}>
              <AiOutlineShoppingCart />
            </li> :
            <li
              onClick={() => loginWithRedirect()}>
              <AiOutlineShoppingCart />
            </li>
          }
          <li onClick={() => viewProduct(product)}><BsEye /></li>
          {isAuthenticated ?
            <li
              onClick={() => { addFavorite(product); setFavoriteProduct(prev => !prev) }}>
              {favoriteProduct ? <AiFillHeart className="favorite" /> : <AiOutlineHeart />}
            </li> :
            <li onClick={() => loginWithRedirect()}><AiOutlineHeart /></li>
          }
        </div>
      </div>
      <div className="detail">
        <p>{product.Category}<span className="favorite">{favoriteProduct && <AiFillHeart />}</span></p>
        <h3>{product.Title}</h3>
        <h4>{formatMoney(product.Price)}</h4>
      </div>
    </div>
  );
}

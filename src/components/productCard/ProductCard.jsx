import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import formatMoney from "../../scripts/formatMoney";
import addCartAnimation from "../../scripts/addCartAnimation";
import "./ProductCard.css";

export const ProductCard = ({ product, addToCart, viewProduct }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
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

  return (
    <div className="product-card" onClick={(e) => navigateDetail(e, product.ProductId)}>
      <div className="img-box">
        <img src={product.Img} alt={product.Title} />
        <div className="icon">
          {
            isAuthenticated ?
              <li className="button-product" onClick={(e) => { addToCart(product); addCartAnimation(e) }}><AiOutlineShoppingCart /></li>
              :
              <li onClick={() => loginWithRedirect()}><AiOutlineShoppingCart /></li>
          }
          <li onClick={() => viewProduct(product)}><BsEye /></li>
          <li><AiOutlineHeart /></li>
        </div>
      </div>
      <div className="detail">
        <p>{product.Category}</p>
        <h3>{product.Title}</h3>
        <h4>{formatMoney(product.Price)}</h4>
      </div>
    </div>
  );
}

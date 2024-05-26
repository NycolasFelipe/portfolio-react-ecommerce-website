import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import formatMoney from "../../scripts/formatMoney";
import "./productCart.css";
import { Link } from "react-router-dom";

export const ProductCart = ({ product, incrementQtd, decrementQtd, removeProduct }) => {
  return (
    <div className="cart-item" key={product.ProductId}>
      <div className="img-box">
        <Link to={`/products/detail?productId=${product.ProductId}`}>
          <img src={product.Img} alt={product.Title} />
        </Link>
      </div>
      <div className="detail">
        <div className="info">
          <h4 className="category">{product.Category}</h4>
          <Link to={`/products/detail?productId=${product.ProductId}`}>
            <h3 className="title">{product.Title}</h3>
          </Link>
          <div className="container">
            <p className="price">Preço: {formatMoney(product.Price)}</p>
            <div className="qtd">
              <button className="dec-qtd" onClick={() => decrementQtd(product)}>-</button>
              <input type="text" value={product.qtd} readOnly />
              <button className="inc-qtd" onClick={() => incrementQtd(product)}>+</button>
            </div>
            <h4 className="subtotal">Sub-total: {formatMoney(product.Price * product.qtd)}</h4>
          </div>
        </div>
        <div className="close">
          <button onClick={() => removeProduct(product)}><AiOutlineClose /></button>
        </div>
      </div>
    </div>
  )
}

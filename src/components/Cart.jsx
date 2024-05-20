import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import formatMoney from "../scripts/formatMoney";
import "./Cart.css";

const Cart = ({ cart, setCart }) => {
  //Incrementar quantidade
  const incrementQtd = (product) => {
    const cartItem = cart.find((x) => {
      return x.ProductId === product.ProductId;
    });
    setCart(cart.map((curElm) => {
      return curElm.ProductId === product.ProductId ? { ...cartItem, qtd: cartItem.qtd + 1 } : curElm;
    }));
  }

  //Decrementar quantidade
  const decrementQtd = (product) => {
    const cartItem = cart.find((x) => {
      return x.ProductId === product.ProductId;
    });
    if (cartItem.qtd > 1) {
      setCart(cart.map((curElm) => {
        return curElm.ProductId === product.ProductId ? { ...cartItem, qtd: cartItem.qtd - 1 } : curElm;
      }));
    } else {
      removeProduct(product);
    }
  }

  //Remover produto
  const removeProduct = (product) => {
    const cartItem = cart.find((x) => {
      return x.ProductId === product.ProductId;
    });
    if (cartItem.qtd > 0) {
      setCart(cart.filter((x) => {
        return x.ProductId !== cartItem.ProductId;
      }));
    }
  }

  //Preço total
  const totalPrice = cart.reduce((price, item) => price + item.qtd * item.Price, 0);

  return (
    <>
      <div className="cart-container">
        {
          cart.length === 0 && (
            <div className="empty-cart">
              <h2 className="empty">Carrinho vazio</h2>
              <Link to="/product" className="empty-cart-button">Compre agora</Link>
            </div>
          )
        }
        <div className="contant">
          {
            cart.map((curElm) => {
              return (
                <div className="cart-item" key={curElm.ProductId}>
                  <div className="img-box">
                    <img src={curElm.Img} alt={curElm.Title} />
                  </div>
                  <div className="detail">
                    <div className="info">
                      <h4>{curElm.Category}</h4>
                      <h3>{curElm.Title}</h3>
                      <p>Preço: {formatMoney(curElm.Price)}</p>
                      <div className="qtd">
                        <button className="dec-qtd" onClick={() => decrementQtd(curElm)}>-</button>
                        <input type="text" value={curElm.qtd} readOnly />
                        <button className="inc-qtd" onClick={() => incrementQtd(curElm)}>+</button>
                      </div>
                      <h4 className="subtotal">Sub-total: {formatMoney(curElm.Price * curElm.qtd)}</h4>
                    </div>
                    <div className="close">
                      <button onClick={() => removeProduct(curElm)}><AiOutlineClose /></button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        {
          cart.length > 0 && (
            <>
              <h2 className="total-price">Total: {formatMoney(totalPrice)}</h2>
              <div className="checkout">
                <button className="checkout-button">
                  Finalizar compra
                </button>
              </div>
            </>
          )
        }
      </div>
    </>
  );
}

export default Cart;
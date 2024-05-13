import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = ({ cart, setCart }) => {
  //Incrementar quantidade
  const incrementQtd = (product) => {
    const cartItem = cart.find((x) => {
      return x.id === product.id;
    });
    setCart(cart.map((curElm) => {
      return curElm.id === product.id ? { ...cartItem, qtd: cartItem.qtd + 1 } : curElm;
    }));
  }

  //Decrementar quantidade
  const decrementQtd = (product) => {
    const cartItem = cart.find((x) => {
      return x.id === product.id;
    });
    if (cartItem.qtd > 1) {
      setCart(cart.map((curElm) => {
        return curElm.id === product.id ? { ...cartItem, qtd: cartItem.qtd - 1 } : curElm;
      }));
    } else {
      removeProduct(product)
    }
  }

  //Remover produto
  const removeProduct = (product) => {
    const cartItem = cart.find((x) => {
      return x.id === product.id;
    });
    if (cartItem.qtd > 0) {
      setCart(cart.filter((x) => {
        return x.id !== cartItem.id;
      }));
    }
  }

  //Preço total
  const totalPrice = cart.reduce((price, item) =>
    price + item.qtd * Number(item.price.replace("R$ ", "").replace(".", "").replace(",", ".")), 0
  );

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
              let priceFormatted = Number(curElm.price.replace("R$ ", "").replace(".", "").replace(",", "."));
              priceFormatted = (priceFormatted * curElm.qtd).toFixed(2);
              priceFormatted = priceFormatted.replace(".", ",");

              return (
                <div className="cart-item" key={curElm.id}>
                  <div className="img-box">
                    <img src={curElm.img} alt={curElm.title} />
                  </div>
                  <div className="detail">
                    <div className="info">
                      <h4>{curElm.category}</h4>
                      <h3>{curElm.title}</h3>
                      <p>Preço: {curElm.price}</p>
                      <div className="qtd">
                        <button className="dec-qtd" onClick={() => decrementQtd(curElm)}>-</button>
                        <input type="text" value={curElm.qtd} readOnly />
                        <button className="inc-qtd" onClick={() => incrementQtd(curElm)}>+</button>
                      </div>
                      <h4 className="subtotal">Sub-total: R$ {priceFormatted}</h4>
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
              <h2 className="total-price">
                Total: R$ {totalPrice.toFixed(2).replace(".", ",")}
              </h2>
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
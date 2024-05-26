import React from "react";
import { Link } from "react-router-dom";
import { ProductCart } from "../../components/productCart/productCart";
import formatMoney from "../../scripts/formatMoney";
import "./Cart.css";

export const Cart = ({ cart, setCart }) => {
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
  const totalPrice = !cart ? 0 : cart.reduce((price, item) => price + item.qtd * item.Price, 0);

  return (
    <>
      <div className="cart-container">
        {
          cart.length === 0 && (
            <div className="empty-cart">
              <h2 className="empty">Carrinho vazio</h2>
              <Link to="/products" className="empty-cart-button">Compre agora</Link>
            </div>
          )
        }
        <div className="contant">
          {
            cart.map((curElm) => {
              return (
                <ProductCart
                  product={curElm}
                  incrementQtd={incrementQtd}
                  decrementQtd={decrementQtd}
                  removeProduct={removeProduct}
                />
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

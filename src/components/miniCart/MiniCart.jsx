import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import formatMoney from "../../scripts/formatMoney";
import styles from "./MiniCart.module.css";

export const MiniCart = ({ cart, setCart, miniCart, setMiniCart }) => {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const hideMiniCart = () => {
    setMiniCart({ ...miniCart, visible: false });
  }

  const showMiniCart = () => {
    setMiniCart({ ...miniCart, visible: true });
  }

  const reduceTotal = () => {
    const totalPrice = cart.reduce((total, item) => {
      return total + item.Price * item.qtd;
    }, 0);
    return totalPrice;
  }

  // Remover um produto
  const removeProduct = (product) => {
    const cartItem = cart.find((x) => {
      return x.ProductId === product.ProductId;
    });
    if (cartItem.qtd > 0) {
      setCart(cart.filter((x) => {
        return x.ProductId !== cartItem.ProductId;
      }));
    }
    if (cart.length === 1) {
      setMiniCart({ ...miniCart, visible: false });
    }
  }

  // Incrementar quantidade de um produto
  const incrementQtd = (product) => {
    setTotal(0)
    const cartItem = cart.find((x) => {
      return x.ProductId === product.ProductId;
    });
    setCart(cart?.map((curElm) => {
      return curElm.ProductId === product.ProductId ? { ...cartItem, qtd: cartItem.qtd + 1 } : curElm;
    }));
  }

  // Decrementar quantidade de um produto
  const decrementQtd = (product) => {
    const cartItem = cart.find((x) => {
      return x.ProductId === product.ProductId;
    });
    if (cartItem.qtd > 1) {
      setCart(cart?.map((curElm) => {
        return curElm.ProductId === product.ProductId ? { ...cartItem, qtd: cartItem.qtd - 1 } : curElm;
      }));
    } else {
      removeProduct(product);
    }
  }

  useEffect(() => {
    setTotal(reduceTotal());
  }, [cart]);

  return (
    <>
      <div className={`${styles.mini_cart} ${miniCart.visible && styles.mini_cart_visible}`}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            <FaCartShopping />
            <h5> Carrinho de Compras</h5>
          </div>
          <div className={styles.close_cart}>
            <button type="button" onClick={() => hideMiniCart()}><IoMdClose /></button>
          </div>
        </div>
        <div className={styles.cart_items}>
          {cart?.map((curElm, index) => {
            return (
              <>
                <div className={styles.cart_item} key={index}>
                  <div className={styles.item_img}>
                    <Link onClick={() => hideMiniCart()} to={"/products/detail?productId=" + curElm.ProductId}>
                      <img src={curElm.Img} alt={curElm.Title} />
                    </Link>
                  </div>
                  <div className={styles.item_details}>
                    <div className={styles.item_title}>
                      <Link onClick={() => hideMiniCart()} to={"/products/detail?productId=" + curElm.ProductId}>
                        <h6>{curElm.Title}</h6>
                      </Link>
                    </div>
                    <div className={styles.item_price}>
                      <p>Preço: <span>{formatMoney(curElm.Price)}</span></p>
                    </div>
                    <div className={styles.item_quantity}>
                      <button className={styles.item_decrement} type="button" onClick={() => decrementQtd(curElm)}>-</button>
                      <input type="number" name="itemQuantity" id="itemQuantity" value={curElm.qtd} disabled />
                      <button className={styles.item_increment} type="button" onClick={() => incrementQtd(curElm)}>+</button>
                    </div>
                    <div className={styles.item_price_total}>
                      <p>Total: <span>{formatMoney(curElm.Price * curElm.qtd)}</span></p>
                    </div>
                  </div>
                  <div className={styles.item_remove}>
                    <button type="button" onClick={() => removeProduct(curElm)}><FaTrash /></button>
                  </div>
                </div>
                <hr key={`hr${index}`} />
              </>
            )
          })}
        </div>
        <div className={styles.cart_total}>
          <div className={styles.subtotal}>
            <p>Subtotal</p><span>{formatMoney(total)}</span>
          </div>
          <div className={styles.frete}>
            <p>Frete</p><span>Grátis</span>
          </div>
          <hr />
          <div className={styles.total}>
            <p>Total</p><span>{formatMoney(total)}</span>
          </div>
        </div>
        <div className={styles.cart_buttons}>
          <div className={styles.cart_buttons_top}>
            <button type="button" onClick={() => hideMiniCart()}>Fechar carrinho</button>
            <button type="button" onClick={() => { hideMiniCart(); navigate("/cart") }}>Ver carrinho</button>
          </div>
          <div className={styles.cart_buttons_bottom}>
            <button type="button" onClick={() => navigate("#")}>Finalizar compra</button>
          </div>
        </div>
      </div>
      <div className={`${styles.mini_cart_button} ${cart.length > 0 && styles.mini_cart_button_visible}`}>
        <button type="button" onClick={() => showMiniCart()}> <FaCartShopping /></button>
      </div>

    </>
  );
}

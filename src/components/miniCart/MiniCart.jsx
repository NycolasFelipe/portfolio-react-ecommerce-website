import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import formatMoney from "../../scripts/formatMoney";
import useOutsideClick from "../../hooks/useOutsideClick";
import styles from "./MiniCart.module.css";

export const MiniCart = ({ cart, setCart, miniCart, setMiniCart }) => {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Esconder minicart ao clicar fora
  const miniCartRef = useRef(null);
  const hideMinicart = () => setMiniCart({ ...miniCart, visible: false });
  useOutsideClick(miniCartRef, hideMinicart);

  // Exibir/esconder o minicart
  const showMiniCart = (visible = false) => setMiniCart({ ...miniCart, visible: visible });

  // Calcular o valor total dos itens do minicart
  const reduceTotal = useCallback(() => {
    const totalPrice = cart.reduce((total, item) => {
      return total + item.Price * item.qtd;
    }, 0);
    return totalPrice;
  }, [cart]);

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

  // Define comportamento de direcionamento para página do produto
  const redirectToProduct = (e, productId) => {
    e.preventDefault();
    const currentProductId = parseInt(new URL(document.location).searchParams.get("productId"));
    if (productId !== currentProductId) {
      navigate("/products/detail?productId=" + productId);
    }
  }

  useEffect(() => {
    const totalPrice = reduceTotal();
    setTotal(totalPrice);
  }, [cart]);

  return (
    <>
      <div className={`${styles.background} ${miniCart.visible && styles.visible}`}></div>
      <div ref={miniCartRef} className={`${styles.mini_cart} ${miniCart.visible && styles.mini_cart_visible}`}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            <FaCartShopping />
            <h5> Carrinho de Compras</h5>
          </div>
          <div className={styles.close_cart}>
            <button type="button" onClick={() => showMiniCart(false)}><IoMdClose /></button>
          </div>
        </div>
        <div className={styles.cart_items}>
          {cart?.map((curElm, index) => {
            return (
              <div className={styles.cart_item} key={index}>
                <div className={styles.item_img}>
                  <Link onClick={(e) => { showMiniCart(false); redirectToProduct(e, curElm.ProductId) }}>
                    <img src={`.${curElm.Img}`} alt={curElm.Title} />
                  </Link>
                </div>
                <div className={styles.item_details}>
                  <div className={styles.item_title}>
                    <Link onClick={(e) => { showMiniCart(false); redirectToProduct(e, curElm.ProductId) }}>
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
            <button type="button" onClick={() => showMiniCart(false)}>Fechar carrinho</button>
            <button type="button" onClick={() => { showMiniCart(false); navigate("/cart") }}>Ver carrinho</button>
          </div>
          <div className={styles.cart_buttons_bottom}>
            <button type="button" onClick={() => navigate("#")}>Finalizar compra</button>
          </div>
        </div>
      </div>
      <div className={`${styles.mini_cart_button} ${cart.length > 0 && styles.mini_cart_button_visible}`}>
        <button type="button" onClick={() => showMiniCart(true)}> <FaCartShopping /></button>
      </div>
    </>
  );
}

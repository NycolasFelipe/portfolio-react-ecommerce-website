import React, { useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { FaLaptop } from "react-icons/fa";
import { IoChevronForwardSharp } from "react-icons/io5";
import addCartAnimation from "../scripts/addCartAnimation";
import formatMoney from "../scripts/formatMoney";
import "./Product.css";

const Product = ({ product, detail, closeDetail, setCloseDetail, viewProduct, addToCart, filterProduct, categories, loading }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const navigateDetail = (e, productId) => {
    // Prevent event bubbling
    if (e.target.nodeName !== "LI") {
      navigate(`detail?productId=${productId}`);
    }
  }

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  return (
    <>
      {
        closeDetail && (
          <div className="product-detail">
            <div className="container">
              <button className="close-button" onClick={() => setCloseDetail(false)}><AiOutlineCloseCircle /></button>
              {
                detail.map((curElm) => {
                  return (
                    <div className="product-box" key={curElm.ProductId}>
                      <div className="img-box">
                        <img src={curElm.Img} alt={curElm.Title} />
                      </div>
                      <div className="detail">
                        <h4>{curElm.Category}</h4>
                        <h2>{curElm.Title}</h2>
                        <p>{curElm.Description}</p>
                        <h3>{formatMoney(curElm.Price)}</h3>
                        {
                          isAuthenticated ?
                            <button className="button-detail" onClick={(e) => { addToCart(curElm); addCartAnimation(e) }}>Adicionar ao carrinho</button>
                            :
                            <button onClick={() => loginWithRedirect()}>Adicionar ao carrinho</button>
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
      }
      <div className="products">
        <h2><FaLaptop className="products-icon" /> Produtos</h2>
        <p><Link to="/" className="link">Início <IoChevronForwardSharp className="chevron" /></Link></p>
        <p>Produtos</p>
        {
          loading ? (
            <img className="loading" src="./img/loading.svg" alt="Loading" />
          ) : (
            <div className="products">
              <div className="container">
                <div className="filter">
                  <div className="categories">
                    <h3>Categorias</h3>
                    <ul>
                      <li key={0} onClick={() => filterProduct("All")}>Todos os produtos</li>
                      {
                        categories.map((curlElm, index) => {
                          return (
                            <li key={index + 1} onClick={() => filterProduct(curlElm)}>{curlElm}</li>
                          )
                        })
                      }
                    </ul>
                  </div>
                  <div className="brand">
                    <div className="container">
                      <div className="product-box">
                        <div className="contant">
                          {
                            product.map((curElm) => {
                              return (
                                <div className="box" key={curElm.ProductId} onClick={(e) => navigateDetail(e, curElm.ProductId)}>
                                  <div className="img-box">
                                    <img src={curElm.Img} alt={curElm.Title} />
                                    <div className="icon">
                                      {
                                        isAuthenticated ?
                                          <li className="button-product" onClick={(e) => { addToCart(curElm); addCartAnimation(e) }}><AiOutlineShoppingCart /></li>
                                          :
                                          <li onClick={() => loginWithRedirect()}><AiOutlineShoppingCart /></li>
                                      }
                                      <li onClick={() => viewProduct(curElm)}><BsEye /></li>
                                      <li><AiOutlineHeart /></li>
                                    </div>
                                  </div>
                                  <div className="detail">
                                    <p>{curElm.Category}</p>
                                    <h3>{curElm.Title}</h3>
                                    <h4>{formatMoney(curElm.Price)}</h4>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </>
  );
}

export default Product;
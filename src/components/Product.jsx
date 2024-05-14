import React from "react";
import ProductDetail from "../scripts/productDetail";
import { AiOutlineCloseCircle, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { FaLaptop } from "react-icons/fa";
import { IoChevronForwardSharp } from "react-icons/io5";
import addCartAnimation from "../scripts/addCartAnimation";
import "./Product.css";

const Product = ({ product, setProduct, detail, closeDetail, setCloseDetail, viewProduct, addToCart }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const filterProduct = (product) => {
    if (product === "All") {
      setProduct(ProductDetail);
    } else {
      const update = ProductDetail.filter((e) => {
        return e.category === product;
      });
      setProduct(update);
    }
  }

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
                    <div className="product-box" key={curElm.id}>
                      <div className="img-box">
                        <img src={curElm.img} alt={curElm.title} />
                      </div>
                      <div className="detail">
                        <h4>{curElm.category}</h4>
                        <h2>{curElm.title}</h2>
                        <p>{curElm.description}</p>
                        <h3>{curElm.price}</h3>
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
        <p>Início <IoChevronForwardSharp className="chevron" />  Produtos</p>
        <div className="products">
          <div className="container">
            <div className="filter">
              <div className="categories">
                <h3>Categorias</h3>
                <ul>
                  <li onClick={() => filterProduct("All")}>Todos os produtos</li>
                  <li onClick={() => filterProduct("Notebook")}>Notebook</li>
                  <li onClick={() => filterProduct("Smartwatch")}>Smartwatch</li>
                  <li onClick={() => filterProduct("Headphone")}>Headphone</li>
                  <li onClick={() => filterProduct("Câmera")}>Câmera</li>
                  <li onClick={() => filterProduct("Mouse")}>Mouse</li>
                  <li onClick={() => filterProduct("Processador")}>Processador</li>
                  <li onClick={() => filterProduct("Console")}>Console</li>
                  <li onClick={() => filterProduct("Monitor")}>Monitor</li>
                  <li onClick={() => filterProduct("Placa de Vídeo")}>Placa de Vídeo</li>
                  <li onClick={() => filterProduct("Tablet")}>Tablet</li>
                  <li onClick={() => filterProduct("Cadeira")}>Cadeira</li>
                </ul>
              </div>
              <div className="brand">
                <div className="container">
                  <div className="product-box">
                    <div className="contant">
                      {
                        product.map((curElm) => {
                          return (
                            <div className="box" key={curElm.id}>
                              <div className="img-box">
                                <img src={curElm.img} alt={curElm.title} />
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
                                <p>{curElm.category}</p>
                                <h3>{curElm.title}</h3>
                                <h4>{curElm.price}</h4>
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
      </div>
    </>
  );
}

export default Product;
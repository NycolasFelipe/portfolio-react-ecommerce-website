import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FaLaptop } from "react-icons/fa";
import { IoChevronDownSharp, IoChevronForwardSharp } from "react-icons/io5";
import { ProductModal } from "../../components/productModal/ProductModal";
import { ProductCard } from "../../components/productCard/ProductCard";
import Pagination from "../../components/pagination/Pagination";
import "./Products.css";

export const Products = ({
  product,
  setProduct,
  detail,
  closeDetail,
  setCloseDetail,
  viewProduct,
  addToCart,
  favorites,
  addFavorite,
  filterProduct,
  categories,
  loading
}) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [visibleOrderBy, setVisibleOrderBy] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const productsHeaderRef = useRef(null);

  const handleOrderBy = (e) => {
    setVisibleOrderBy(prev => !prev);
    const target = e.target.classList[0];
    if (target?.includes("option")) {
      const optionText = e.target.innerText;
      // Muda opção selecionada
      document.querySelectorAll(".products > .products-header .options .option")
        .forEach((elm) => elm.classList.remove("selected"));
      e.target.classList.add("selected");

      // Atualiza texto "Ordenar por"
      document.querySelector(".products > .products-header .order-type").textContent = optionText;

      // Ordenação ascendente
      if (optionText.toLowerCase().includes("menor")) {
        setProduct(prev => prev.sort((a, b) => {
          return a.Price - b.Price;
        }));
        return;
      }

      // Ordenação decrescente
      setProduct(prev => prev.sort((a, b) => {
        return b.Price - a.Price;
      }));
    }
  }

  const scrollToProductsHeader = () => {
    productsHeaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      {closeDetail && (
        <ProductModal
          detail={detail}
          setCloseDetail={setCloseDetail}
          addToCart={addToCart}
          isAuthenticated={isAuthenticated}
          loginWithRedirect={loginWithRedirect}
        />
      )}
      <div className="products">
        <div className="products-header" ref={productsHeaderRef}>
          <div className="contant">
            <h2><FaLaptop className="products-icon" /> Produtos</h2>
            <p><Link to="/" className="link">Início <IoChevronForwardSharp className="chevron" /></Link></p>
            <p>Produtos</p>
          </div>
          <div className="search-results hide"></div>
          <div className="order-by">
            <div className="text">Ordenar por </div>
            <div className="select" onClick={(e) => handleOrderBy(e)}>
              <p className="order-type">Menor preço</p>
              <span className="icon"><IoChevronDownSharp className={`${visibleOrderBy ? "" : "hide"}`} /></span>
              <div className={`options ${visibleOrderBy ? "" : "hide"}`}>
                <p className="option menor selected">Menor preço</p>
                <p className="option maior">Maior preço</p>
              </div>
            </div>
          </div>
        </div>
        {loading ? (<img className="loading" src="./img/loading.svg" alt="Loading" />) : (
          <div className="products">
            <div className="container">
              <div className="filter">
                <div className="categories">
                  <h3>Categorias</h3>
                  <ul>
                    <li key={0} onClick={() => filterProduct("All")}>Todos os produtos</li>
                    {categories?.map((curlElm, index) => {
                      return <li key={index + 1} onClick={() => filterProduct(curlElm)}>{curlElm}</li>
                    })}
                  </ul>
                </div>
              </div>
              <div className="brand">
                <div className="product-box">
                  <div className="contant">
                    {product[pageIndex]?.map((curElm, index) => {
                      return (
                        <ProductCard
                          key={index}
                          product={curElm}
                          addToCart={addToCart}
                          viewProduct={viewProduct}
                          favorites={favorites}
                          addFavorite={addFavorite}
                        />
                      )
                    })}
                  </div>
                </div>
                <div className="product-pagination">
                  <Pagination
                    data={product}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    scrollTo={scrollToProductsHeader}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

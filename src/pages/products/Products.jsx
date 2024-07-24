import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaLaptop } from "react-icons/fa";
import { IoChevronForwardSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { ProductCard } from "../../components/productCard/ProductCard";
import { Select } from "../../components/select/Select";
import Pagination from "../../components/pagination/Pagination";
import paginate from "../../scripts/paginate";
import styles from "./Products.module.css";

export const Products = ({
  product,
  setProduct,
  addToCart,
  favorites,
  addFavorite,
  filterProduct,
  categories,
  loading,
  dataPerPage
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const productsHeaderRef = useRef(null);
  const searchResultRef = useRef(null);

  const handleOrderBy = (value) => {
    switch (value) {
      case "Menor preço":
        const productAsc = product.flat(Infinity).sort((a, b) => a.Price - b.Price);
        const productAscPaginated = paginate(productAsc, dataPerPage.current);
        setProduct(productAscPaginated);
        break;

      case "Maior preço":
        const productDesc = product.flat(Infinity).sort((a, b) => b.Price - a.Price);
        const productDescPaginated = paginate(productDesc, dataPerPage.current);
        setProduct(productDescPaginated);
        break;

      default: break;
    }
  }

  const handleClearSearch = () => {
    filterProduct("Todos");
    searchResultRef.current.setAttribute("visible", false);
  }

  const scrollToProductsHeader = () => {
    productsHeaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  useEffect(() => {
    setPageIndex(0);
  }, [product]);

  return (
    <>
      <div className={styles.products}>
        <div className={styles.container}>
          <div className={styles.header} ref={productsHeaderRef}>
            <div className={styles.container}>
              <h2><FaLaptop className={styles.icon} /> Produtos</h2>
              <p>
                <Link to="/" className={styles.link}>
                  Início <IoChevronForwardSharp className={styles.chevron} />
                </Link>
              </p>
              <p>Produtos</p>
            </div>
            <div className={styles.filter}>
              <div className={styles.categories_mobile}>
                <Select
                  title="Filtrar por"
                  options={["Todos"].concat(categories)}
                  defaultValue="Categoria"
                  onChange={(e) => filterProduct(e.target.value)}
                />
              </div>
              <div className={styles.order_by}>
                <Select
                  title="Ordenar por"
                  options={["Menor preço", "Maior preço"]}
                  defaultValue="Preço"
                  onChange={(e) => handleOrderBy(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div ref={searchResultRef} id="searchResult" visible="false" className={styles.search_result}>
            <div className={styles.container}>
              <div id="searchFound" visible="false" className={styles.search_found}>
                <p>Resultados de busca para “<span className={styles.term}>produto</span>”:</p>
              </div>
              <div id="searchNotFound" visible="false" className={styles.search_not_found}>
                <p>Não foi possível encontrar resultados para “<span className={styles.term}>produto</span>”:</p>
              </div>
              <button type="button" className={styles.search_clear}>
                <IoMdClose className={styles.icon} onClick={() => handleClearSearch()} />
              </button>
            </div>
          </div>
          {loading ? (<img className={styles.loading} src="./img/loading.svg" alt="Loading" />) : (
            <div className={styles.product_items}>
              <div className={styles.container}>
                <div className={styles.filter}>
                  <div className={styles.categories}>
                    <h3>Categorias</h3>
                    <ul>
                      <li key={0} onClick={() => filterProduct("Todos")}>Todos os produtos</li>
                      {categories?.map((curlElm, index) => {
                        return <li key={index + 1} onClick={() => filterProduct(curlElm)}>{curlElm}</li>
                      })}
                    </ul>
                  </div>
                </div>
                <div className={styles.brand}>
                  <div className={styles.product_box}>
                    {product[pageIndex]?.map((curElm, index) => {
                      return (
                        <ProductCard
                          key={index}
                          product={curElm}
                          addToCart={addToCart}
                          favorites={favorites}
                          addFavorite={addFavorite}
                        />
                      )
                    })}
                  </div>
                  <div className={styles.pagination}>
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
      </div>
    </>
  );
}

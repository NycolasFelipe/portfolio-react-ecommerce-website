import React, { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react"
import { useNavigate } from "react-router-dom";
import { Nav } from "./components/nav/Nav";
import { Footer } from "./components/footer/Footer";
import { Routing } from "./router/Routing";
import removeDiacritcs from "./scripts/removeDiacritcs";
import getProduct from "./api/getProduct";
import "./App.css";
import getProductInfo from "./scripts/getProductInfo.js";

export const App = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [initialProduct, setInitialProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  //Adicionar ao carrinho
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    const productId = product.ProductId;
    let productAdded = false;
    cart.map(e => {
      if (e.ProductId === productId) {
        e.qtd++;
        productAdded = true;
        return;
      }
    });
    if (!productAdded) {
      getProductInfo(product.ProductId).then((productItem) => {
        // Adiciona item somente se houver disponível em estoque
        if (productItem.Info[0].Stock > 0) {
          setCart([...cart, { ...productItem, qtd: 1 }]); 
        }
      });
    }
  }

  // Modal com detalhes do produto
  const [closeDetail, setCloseDetail] = useState(false);
  const [detail, setDetail] = useState([]);
  const viewProduct = (product) => {
    setDetail([{ ...product }]);
    setCloseDetail(true);
  }

  // Pesquisar produtos
  const [search, setSearch] = useState("");
  const searchButton = (product) => {
    if (product) {
      //Redireciona para página de pesquisa
      const currentURL = window.location.pathname;
      if (!currentURL.includes("products")) {
        navigate("/products");
      }
      const change = initialProduct.filter((x) => {
        const productCategory = removeDiacritcs(x.Category).toLowerCase().trim();
        const productTitle = removeDiacritcs(x.Title).toLowerCase().trim();
        product = removeDiacritcs(product).toLowerCase().trim();
        return productCategory.includes(product) || productTitle.includes(product);
      });
      setProduct(change);
      setSearch("");

      // Exibe texto de resultado da pesquisa
      setTimeout(() => {
        const resultadoPesquisa = document.querySelector(".products > .products-header .search-results");
        if (resultadoPesquisa) {
          resultadoPesquisa.classList.remove("hide");
          resultadoPesquisa.innerHTML = change.length > 0 ?
            `<p>Resultados de busca para "<span class="term">${search}</span>":</p>` :
            `<p>Não foi possível encontrar resultados para "<span class="term">${search}</span>"</p>`;
        }
      }, 10);
    }
  }

  // Filtrar produtos
  const filterProduct = (category) => {
    if (category === "All") {
      setProduct(initialProduct);
    } else {
      const update = initialProduct.filter((e) => {
        return e.Category === category;
      });
      setProduct(update);
    }

    // Limpa resultados de pesquisa
    const resultadoPesquisa = document.querySelector(".products > .products-header .search-results");
    resultadoPesquisa && resultadoPesquisa.classList.add("hide");
  }

  // Carregar produtos
  useEffect(() => {
    getProduct().then((data) => {
      const categories = !data ? [] : data.reduce((categories, product, index) => {
        const category = product.Category;
        if (categories.indexOf(category) === -1) {
          categories.push(category);
        }
        if (index === data.length - 1) {
          return categories.sort();
        }
        return categories;
      }, []);

      setCategories(categories);
      setProduct(data);
      setInitialProduct(data);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, []);

  return (
    <>
      <Nav
        search={search}
        setSearch={setSearch}
        searchButton={searchButton}
      />
      <Routing
        product={product}
        setProduct={setProduct}
        detail={detail}
        closeDetail={closeDetail}
        setCloseDetail={setCloseDetail}
        viewProduct={viewProduct}
        cart={cart}
        setCart={setCart}
        addToCart={addToCart}
        filterProduct={filterProduct}
        categories={categories}
        loading={loading}
      />
      <Footer />
      <Analytics />
    </>
  );
}

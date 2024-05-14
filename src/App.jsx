import React, { useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Routing from "./components/Routing";
import ProductDetail from "./scripts/productDetail";
import removeDiacritcs from "./scripts/removeDiacritcs";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  //Adicionar ao carrinho
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    setCart([...cart, { ...product, qtd: 1 }]);
  }

  // Detalhes do produto
  const [closeDetail, setCloseDetail] = useState(false);
  const [detail, setDetail] = useState([]);
  const viewProduct = (product) => {
    setDetail([{ ...product }]);
    setCloseDetail(true);
  }

  // Filtrar produtos
  const [product, setProduct] = useState(ProductDetail);
  const searchButton = (product) => {
    //Redireciona para página de pesquisa
    const currentURL = window.location.pathname;
    if (!currentURL.includes("product")) {
      navigate("/product");
    }

    const change = ProductDetail.filter((x) => {
      const productCategory = removeDiacritcs(x.category).toLowerCase().trim();
      const productTitle = removeDiacritcs(x.title).toLowerCase().trim();
      product = removeDiacritcs(product).toLowerCase().trim();
      return productCategory.includes(product) || productTitle.includes(product);
    });
    setProduct(change);

    // Limpa campo de pesquisa
    setSearch("")
  }

  //Pesquisa
  const [search, setSearch] = useState("");

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
      />
      <Footer />
    </>
  );
}

export default App;

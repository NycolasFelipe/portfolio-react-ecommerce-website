import React, { useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Routing from "./components/Routing";
import ProductDetail from "./scripts/productDetail.js";

const App = () => {
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
    const change = ProductDetail.filter((x) => {
      return x.category === product;
    });
    setProduct(change);
  }

  return (
    <>
      <Nav searchButton={searchButton} />
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

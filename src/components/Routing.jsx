import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Product from "./Product.jsx";
import Cart from "./Cart.jsx";
import Contact from "./Contact.jsx"

const Routing = ({ product, setProduct, detail, closeDetail, setCloseDetail, viewProduct, cart, setCart, addToCart }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <Home
            detail={detail}
            closeDetail={closeDetail}
            setCloseDetail={setCloseDetail}
            viewProduct={viewProduct}
            addToCart={addToCart}
          />
        }
        />
        <Route path="/product" element={
          <Product
            product={product}
            setProduct={setProduct}
            detail={detail}
            closeDetail={closeDetail}
            setCloseDetail={setCloseDetail}
            viewProduct={viewProduct}
            addToCart={addToCart}
          />
        }
        />
        <Route path="/cart" element={
          <Cart
            cart={cart}
            setCart={setCart}
          />
        }
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default Routing;
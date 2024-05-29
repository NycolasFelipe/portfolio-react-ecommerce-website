import React from "react";
import { Routes, Route, redirect, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Home } from "../pages/home/Home";
import { Products } from "../pages/products/Products";
import { Cart } from "../pages/cart/Cart";
import { Contact } from "../pages/contact/Contact";
import { ProductDetail } from "../pages/productDetail/ProductDetail";
import { Account } from "../pages/account/Account";

export const Routing = ({
  product,
  setProduct,
  detail,
  closeDetail,
  setCloseDetail,
  viewProduct,
  cart,
  setCart,
  addToCart,
  filterProduct,
  categories,
  loading
}) => {
  const { isAuthenticated } = useAuth0();

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
        <Route path="/products" element={
          <Products
            product={product}
            setProduct={setProduct}
            detail={detail}
            closeDetail={closeDetail}
            setCloseDetail={setCloseDetail}
            viewProduct={viewProduct}
            addToCart={addToCart}
            filterProduct={filterProduct}
            categories={categories}
            loading={loading}
          />
        }
        />
        <Route path="/products/detail" element={
          <ProductDetail
            addToCart={addToCart}
          />
        }
        />
        <Route path="/cart" element={
          isAuthenticated ? <Cart cart={cart} setCart={setCart} /> : <Navigate to="/" />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default Routing;
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Home } from "../pages/home/Home";
import { Products } from "../pages/products/Products";
import { Cart } from "../pages/cart/Cart";
import { Contact } from "../pages/contact/Contact";
import { ProductDetail } from "../pages/productDetail/ProductDetail";
import { About } from "../pages/about/About";
import { Account } from "../pages/account/Account";
import { Favorites } from "../pages/favorites/Favorites";

export const Routing = ({
  homeProduct,
  product,
  setProduct,
  cart,
  setCart,
  addToCart,
  addFavorite,
  favorites,
  filterProduct,
  categories,
  loading,
  dataPerPage
}) => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Routes>
        <Route path="/" element={
          <Home
            product={homeProduct}
            addToCart={addToCart}
            favorites={favorites}
            addFavorite={addFavorite}
            loading={loading}
          />
        }
        />
        <Route path="/products" element={
          <Products
            product={product}
            setProduct={setProduct}
            addToCart={addToCart}
            favorites={favorites}
            addFavorite={addFavorite}
            filterProduct={filterProduct}
            categories={categories}
            loading={loading}
            dataPerPage={dataPerPage}
          />
        }
        />
        <Route path="/products/detail" element={
          <ProductDetail
            addToCart={addToCart}
            favorites={favorites}
            addFavorite={addFavorite}
          />
        }
        />
        <Route path="/cart" element={
          isAuthenticated ? <Cart cart={cart} setCart={setCart} /> : <Navigate to="/" />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/" />} />
        <Route path="/favorites" element={
          isAuthenticated ? <Favorites favorites={favorites} addFavorite={addFavorite} /> : <Navigate to="/" />
        }
        />
      </Routes>
    </>
  );
}

export default Routing;
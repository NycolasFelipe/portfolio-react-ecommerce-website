import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import formatMoney from "../../scripts/formatMoney";
import getProductInfo from "../../scripts/getProductInfo";
import { ButtonComprar } from "../buttonComprar/ButtonComprar";
import { IoMdClose } from "react-icons/io";
import "./ProductModal.css";

export const ProductModal = ({ detail, setCloseDetail, isAuthenticated, loginWithRedirect, addToCart }) => {
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadProductInfo = useCallback(async (detail) => {
    getProductInfo(detail[0].ProductId)
      .then((data) => {
        setStock(data.Info[0].Stock);
      })
      .then(() => {
        setLoading(false);
      })
  }, [detail]);

  useEffect(() => {
    loadProductInfo(detail);
  }, [detail]);

  return (
    <div className="product-modal">
      <div className="container">
        <button className="close-button" onClick={() => setCloseDetail(false)}><IoMdClose /></button>
        {loading ? (
          <div className="loading-container">
            <img src="./img/loading.svg" alt="Loading" />
          </div>
        ) : (
          detail?.map((curElm) => {
            return (
              <div className="product-box" key={curElm.ProductId}>
                <div className="img-box">
                  <Link
                    to={`/products/detail?productId=${curElm.ProductId}`}
                    onClick={() => setCloseDetail(false)}
                  >
                    <img src={curElm.Img} alt={curElm.Title} />
                  </Link>
                </div>
                <div className="detail">
                  <h4>{curElm.Category}</h4>
                  <h2>
                    <Link
                      to={`/products/detail?productId=${curElm.ProductId}`}
                      onClick={() => setCloseDetail(false)}>
                      {curElm.Title}
                    </Link>
                  </h2>
                  <p>{curElm.Description}</p>
                  <h3>{formatMoney(curElm.Price)}</h3>
                  {stock > 0 ? (
                    isAuthenticated ? (
                      <div className="btn_container" onClick={() => addToCart(curElm)}>
                        <ButtonComprar />
                      </div>
                    ) : (
                      <div className="btn_container" onClick={() => loginWithRedirect()}>
                        <ButtonComprar redirect={true} />
                      </div>
                    )
                  ) : (
                    <div className="btn_container">
                      <ButtonComprar disabled={true} />
                    </div>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Zoom from "react-img-zoom";
import { IoChevronForwardSharp, IoDocumentText } from "react-icons/io5";
import { AiFillProduct, AiOutlineHeart } from "react-icons/ai";
import { LuShare2 } from "react-icons/lu";
import { IoIosInformationCircle } from "react-icons/io";
import formatMoney from "../../scripts/formatMoney";
import getProductInfo from "../../scripts/getProductInfo";
import getProductCategory from "../../api/getProductCategory";
import setParam from "../../scripts/setParam";
import Slider from "react-slick";
import { ButtonComprar } from "../../components/buttonComprar/ButtonComprar";
import { ShareModal } from "../../components/shareModal/ShareModal";
import { disableScroll, enableScroll } from "../../scripts/disableScroll";
import "./ProductDetail.css";

export const ProductDetail = ({ addToCart }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const productId = new URL(document.location).searchParams.get("productId");
  const [productDetail, setProductDetail] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareModal, setShareModal] = useState(false);
  const sliderSettings = { infinite: false, speed: 300, slidesToShow: 1, variableWidth: true, initialSlide: 0 };

  async function fetchData(id) {
    getProductInfo(id)
      .then((data) => {
        setProductDetail(data);
        getProductCategory(data.Category).then((similarProducts) => {
          const items = similarProducts.filter((elm) => elm.ProductId !== data.ProductId)
          setSimilarProducts(items);
          setLoading(false);
        });
      });
  }

  function redirectToProduct(id) {
    setParam("productId", id);
    setLoading(true);
    fetchData(id);
    window && window.scroll(0, 0);
  }

  const handleShareModal = (active) => {
    setShareModal(active);
    active ? disableScroll() : enableScroll();
  }

  useEffect(() => {
    fetchData(productId);
  }, []);

  return (
    <>
      <div className="product_detail">
        {
          loading ? (
            <img className="loading" src="../img/loading.svg" alt="Loading" />
          ) : (
            <>
              <div className="header">
                <h2>{productDetail.Title}</h2>
                <p>
                  <Link to="/" className="link">
                    Início <IoChevronForwardSharp className="chevron" />
                  </Link>
                  <Link to="/products" className="link">
                    Produtos <IoChevronForwardSharp className="chevron" />
                  </Link>
                  <Link className="link link-last">
                    {productDetail.Category}
                  </Link>
                </p>
              </div>
              <div className="view_container">
                <div className="view">
                  <div className="img-box">
                    <Zoom
                      className="img"
                      img={"../" + productDetail.Img}
                      zoomScale={1.6}
                      width={640}
                      height={500}
                    />
                  </div>
                </div>
                <div className="details">
                  <div className="container stock">
                    <p>Vendido e entregue por <span className="shop-detail"><Link to="/">Ecommerce Shop </Link> </span> | <span></span>
                      <span className="shop-stock">
                        {productDetail.Info[0].Stock > 0 ? productDetail.Info[0].Stock + " em estoque" : "Fora de estoque"}
                      </span>
                    </p>
                  </div>
                  <div className="container buy">
                    <div className="contant">
                      <p className="product_price">{formatMoney(productDetail.Price)}</p>
                      <p className="product_promo">à vista no PIX como até 7% OFF</p>
                      <p className="product_price_pix"><b>{formatMoney(productDetail.Price * 0.93)}</b></p>
                      <p className="product_parcelas">Em até 10x de {formatMoney(productDetail.Price * 0.1)} sem juros no cartão</p>
                      <p className="product_parcela">Ou em 1x no cartão com até 7% OFF</p>
                    </div>
                    <div className="contant">
                      {
                        productDetail.Info[0].Stock > 0 ? (
                          isAuthenticated ? (
                            <div className="btn_container" onClick={() => addToCart(productDetail)}>
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
                        )
                      }
                    </div>
                  </div>
                  {
                    similarProducts.length > 0 && (
                      <div className="container similar">
                        <p><AiFillProduct className="icon" />Produtos similares</p>
                        <div className="slider">
                          <Slider {...sliderSettings}>
                            {
                              similarProducts?.map((curElm) => {
                                return (
                                  <div className="slider_box" key={curElm.ProductId} onClick={() => redirectToProduct(curElm.ProductId)}>
                                    <div className="img_box">
                                      <img src={`../${curElm.Img}`} alt={curElm.Title} title={curElm.Title} />
                                    </div>
                                    <div className="price">
                                      <p>{formatMoney(curElm.Price)}</p>
                                    </div>
                                  </div>
                                )
                              })
                            }
                          </Slider>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
              {shareModal && (
                <>
                  <div onClick={() => handleShareModal(false)} className="share_modal_blur"></div>
                  <ShareModal handleShareModal={handleShareModal} />
                </>
              )}
              <div className="interact">
                <button className="like" title="Compartilhar" onClick={() => handleShareModal(true)}><LuShare2 /></button>
                <button className="share" title="Adicionar aos favoritos"><AiOutlineHeart /></button>
              </div>
              <div className="description">
                <h3><IoDocumentText className="icon" />DESCRIÇÃO DO PRODUTO</h3>
                {
                  productDetail.Info[0].Description?.map((curElm, index) => {
                    return (
                      <div key={index} className="description_item">
                        <p className="topic">{curElm.topic}</p>
                        <p className="text">{curElm.text}</p>
                      </div>
                    )
                  })
                }
              </div>
              <div className="details">
                <h3><IoIosInformationCircle className="icon" /> DETALHES DO PRODUTO</h3>
                {
                  productDetail.Info[0].Details?.map((curElm, index) => {
                    return (
                      <div key={index} className="details_item">
                        <p className="topic">{curElm.topic}</p>
                        <ul>
                          {
                            productDetail.Info[0].Details[index].items?.map((curElm, j) => {
                              return (
                                <li key={j}><p className="item">- {curElm}</p></li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    )
                  })
                }
              </div>
            </>
          )
        }
      </div>
    </>
  );
}

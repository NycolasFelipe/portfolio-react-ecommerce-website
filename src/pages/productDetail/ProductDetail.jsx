import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Zoom from "react-img-zoom";
import { IoChevronForwardSharp, IoDocumentText } from "react-icons/io5";
import { AiFillHeart, AiFillProduct, AiOutlineHeart } from "react-icons/ai";
import { LuShare2 } from "react-icons/lu";
import { IoIosInformationCircle } from "react-icons/io";
import formatMoney from "../../scripts/formatMoney";
import getProductInfo from "../../scripts/getProductInfo";
import getProductCategory from "../../api/getProductCategory";
import setParam from "../../scripts/setParam";
import Slider from "react-slick";
import { ButtonComprar } from "../../components/buttonComprar/ButtonComprar";
import { ShareModal } from "../../components/shareModal/ShareModal";
import { disableScroll, enableScroll } from "../../scripts/enableDisableScroll";
import "./ProductDetail.slider.css";
import styles from "./ProductDetail.module.css";

export const ProductDetail = ({ addToCart, favorites, addFavorite }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const productId = new URL(document.location).searchParams.get("productId");
  const [productDetail, setProductDetail] = useState({});
  const [favoriteProduct, setFavoriteProduct] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareModal, setShareModal] = useState(false);
  const [tab, setTab] = useState(1);
  const sliderSettings = { infinite: false, speed: 300, slidesToShow: 1, variableWidth: true, initialSlide: 0 };
  const location = useLocation();

  const fetchData = useCallback(async (id) => {
    getProductInfo(id)
      .then((data) => {
        setProductDetail(data);
        getProductCategory(data.Category).then((similarProducts) => {
          const items = similarProducts.filter((elm) => elm.ProductId !== data.ProductId);
          setSimilarProducts(items);
          setLoading(false);
        })
        favoriteThisProduct(favorites, data);
      })
  }, []);

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

  // Determina se este produto é um produto favoritado
  const favoriteThisProduct = (items, product) => {
    if (items?.length > 0) {
      const isFavorite = items?.filter((curElm) => curElm.ProductId === product.ProductId).length > 0;
      if (isFavorite) {
        setFavoriteProduct(true);
        return;
      }
      setFavoriteProduct(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchData(productId);
    window && window.scroll(0, 0);
  }, [location]);

  return (
    <>
      <div className={styles.product_detail}>
        {loading ? (<img className={styles.loading} src="../img/loading.svg" alt="Loading" />) : (
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.container}>
                <h2>{productDetail.Title}</h2>
                <p>
                  <Link to="/" className={styles.link}>
                    Início <IoChevronForwardSharp className={styles.chevron} />
                  </Link>
                  <Link to="/products" className={styles.link}>
                    Produtos <IoChevronForwardSharp className={styles.chevron} />
                  </Link>
                  <Link className={styles.link}>
                    {productDetail.Category}
                  </Link>
                </p>
              </div>
            </div>
            <div className={styles.view}>
              <div className={styles.container}>
                <div className={styles.img_box}>
                  <Zoom
                    className={styles.img}
                    img={"../" + productDetail.Img}
                    zoomScale={1.4}
                    width={500}
                    height={500}
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.stock}>
                    <p>Vendido e entregue por <span className={styles.shop_detail}><Link to="/">Ecommerce Shop </Link> </span> | <span></span>
                      <span className={styles.shop_stock}>
                        {productDetail.Info.Stock > 0 ? productDetail.Info.Stock + " em estoque" : "Fora de estoque"}
                      </span>
                    </p>
                  </div>
                  <div className={styles.buy}>
                    <div className={styles.container}>
                      <p className={styles.product_price}>{formatMoney(productDetail.Price)}</p>
                      <p className={styles.product_promo}>à vista no PIX como até 7% OFF</p>
                      <p className={styles.product_price_pix}><b>{formatMoney(productDetail.Price * 0.93)}</b></p>
                      <p className={styles.product_parcelas}>Em até 10x de {formatMoney(productDetail.Price * 0.1)} sem juros no cartão</p>
                      <p className={styles.product_parcela}>Ou em 1x no cartão com até 7% OFF</p>
                      <div className={styles.button}>
                        {productDetail.Info.Stock > 0 ? (
                          isAuthenticated ? (
                            <div className={styles.btn_container} onClick={() => addToCart(productDetail)}>
                              <ButtonComprar />
                            </div>
                          ) : (
                            <div className={styles.btn_container} onClick={() => loginWithRedirect()}>
                              <ButtonComprar redirect={true} />
                            </div>
                          )
                        ) : (
                          <div className={styles.btn_container}>
                            <ButtonComprar disabled={true} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {similarProducts.length > 0 && (
                    <div className={styles.similar}>
                      <p><AiFillProduct className={styles.icon} />Produtos similares</p>
                      <div className={`products_slider ${styles.slider}`}>
                        <Slider {...sliderSettings}>
                          {similarProducts?.map((curElm) => {
                            return (
                              <div className={styles.slider_box} key={curElm.ProductId} onClick={() => redirectToProduct(curElm.ProductId)}>
                                <div className={styles.img_box}>
                                  <img src={`../${curElm.Img}`} alt={curElm.Title} title={curElm.Title} />
                                </div>
                                <div className={styles.price}>
                                  <p>{formatMoney(curElm.Price)}</p>
                                </div>
                              </div>
                            )
                          })}
                        </Slider>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              onClick={() => handleShareModal(false)}
              className={`${styles.share_modal_blur} ${shareModal && `${styles.show}`}`}
            >
            </div>
            <div className={`${styles.share_modal} ${shareModal && `${styles.show}`}`}>
              <ShareModal handleShareModal={handleShareModal} />
            </div>
            <div className={styles.interact}>
              <div className={styles.container}>
                <button className={styles.share} title="Compartilhar" onClick={() => handleShareModal(true)}><LuShare2 /></button>
                {isAuthenticated ?
                  <button
                    className={favoriteProduct ? `${styles.like} ${styles.favorited}` : `${styles.like}`}
                    onClick={() => { addFavorite(productDetail); setFavoriteProduct(prev => !prev) }}
                    title="Adicionar aos favoritos">
                    {favoriteProduct ? <AiFillHeart /> : <AiOutlineHeart />}
                  </button>
                  :
                  <button
                    className={styles.like}
                    onClick={() => loginWithRedirect()}
                    title="Adicionar aos favoritos">
                    <AiOutlineHeart />
                  </button>
                }
              </div>
            </div>
            <div className={styles.description}>
              <div className={styles.tabs}>
                <div className={styles.tab} onClick={() => setTab(1)} active={(tab === 1).toString()}>
                  <h3><IoDocumentText className={styles.icon} /> Descrição</h3>
                </div>
                <div className={styles.tab} onClick={() => setTab(2)} active={(tab === 2).toString()}>
                  <h3><IoIosInformationCircle className={styles.icon} /> Detalhes</h3>
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.text} active={(tab === 1).toString()}>
                  {productDetail.Info.Description?.map((curElm, index) => {
                    return (
                      <div key={index} className={styles.description_item}>
                        <p className={styles.description_topic}>{curElm.topic}</p>
                        <p className={styles.description_text}>{curElm.text}</p>
                      </div>
                    )
                  })}
                </div>
                <div className={styles.text} active={(tab === 2).toString()}>
                  {productDetail.Info.Details?.map((curElm, index) => {
                    return (
                      <div key={index} className={styles.details_item}>
                        <p className={styles.details_topic}>{curElm.topic}</p>
                        <ul>
                          {productDetail.Info.Details[index].items?.map((curElm, j) => {
                            return (
                              <li key={j}><p className="item">- {curElm}</p></li>
                            )
                          })}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

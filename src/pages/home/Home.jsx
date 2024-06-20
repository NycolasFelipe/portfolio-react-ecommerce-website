import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BsArrowRight, BsCurrencyDollar } from "react-icons/bs";
import { BiHeadphone } from "react-icons/bi";
import { FiTruck } from "react-icons/fi";
import { ProductModal } from "../../components/productModal/ProductModal";
import { ProductCard } from "../../components/productCard/ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Home.css";

export const Home = ({ product, detail, closeDetail, setCloseDetail, viewProduct, addToCart, loading }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const sliderSettings = { infinite: false, speed: 300, slidesToShow: 1, variableWidth: true, initialSlide: 1 };

  return (
    <main className="home">
      {closeDetail && (
        <ProductModal
          detail={detail}
          setCloseDetail={setCloseDetail}
          addToCart={addToCart}
          isAuthenticated={isAuthenticated}
          loginWithRedirect={loginWithRedirect}
        />
      )}
      <div className="top-banner">
        <div className="container">
          <div className="detail">
            <h2>A Melhor Coleção de Notebooks</h2>
            <Link className='link' to="/products">Compre agora <BsArrowRight /></Link>
          </div>
          <div className="img-box">
            <img src="./img/slider.png" alt="Imagem slider notebook" />
          </div>
        </div>
      </div>
      <div className="product-type">
        <div className="container">
          <div className="box">
            <div className="img-box">
              <img src="./img/smartphone.png" alt="Smartphone" />
            </div>
            <div className="detail">
              <p>23 produtos</p>
            </div>
          </div>
          <div className="box">
            <div className="img-box">
              <img src="./img/smartwatch.png" alt="Smartwatch" />
            </div>
            <div className="detail">
              <p>18 produtos</p>
            </div>
          </div>
          <div className="box">
            <div className="img-box">
              <img src="./img/headphone.png" alt="Headphone" />
            </div>
            <div className="detail">
              <p>52 produtos</p>
            </div>
          </div>
          <div className="box">
            <div className="img-box">
              <img src="./img/gpu.png" alt="Placa de vídeo" />
            </div>
            <div className="detail">
              <p>63 produtos</p>
            </div>
          </div>
        </div>
        <div className="container-slider">
          <Slider {...sliderSettings}>
            <div className="box">
              <div className="img-box">
                <img src="./img/smartphone.png" alt="Smartphone" />
              </div>
              <div className="detail">
                <p>23 produtos</p>
              </div>
            </div>
            <div className="box">
              <div className="img-box">
                <img src="./img/smartwatch.png" alt="Smartwatch" />
              </div>
              <div className="detail">
                <p>18 produtos</p>
              </div>
            </div>
            <div className="box">
              <div className="img-box">
                <img src="./img/headphone.png" alt="Headphone" />
              </div>
              <div className="detail">
                <p>52 produtos</p>
              </div>
            </div>
            <div className="box">
              <div className="img-box">
                <img src="./img/gpu.png" alt="Placa de vídeo" />
              </div>
              <div className="detail">
                <p>63 produtos</p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <div className="about">
        <div className="container">
          <div className="box">
            <div className="icon">
              <FiTruck />
            </div>
            <div className="detail">
              <h3>Entrega Grátis</h3>
              <p>Pedidos acima de R$ 100,00</p>
            </div>
          </div>
          <div className="box">
            <div className="icon">
              <BsCurrencyDollar />
            </div>
            <div className="detail">
              <h3>Garantia de Reembolso</h3>
              <p>Seu dinheiro seguro</p>
            </div>
          </div>
          <div className="box">
            <div className="icon">
              <BiHeadphone />
            </div>
            <div className="detail">
              <h3>Suporte ao Consumidor</h3>
              <p>Assistência 24hrs</p>
            </div>
          </div>
        </div>
      </div>
      <div className="product">
        <h2>Produtos em Alta</h2>
        {loading ? (<img className="loading" src="./img/loading.svg" alt="Loading" />) :
          (
            <div className="container">
              {
                product?.map((curElm, index) => {
                  return <ProductCard key={index} product={curElm} addToCart={addToCart} viewProduct={viewProduct} />
                })
              }
            </div>
          )}
      </div>
      <div className="banner">
        <div className="container">
          <div className="detail">
            <h4>A Mais Recente Tecnologia</h4>
            <h3>Apple iPad 10.9" 10ª Geração, Wi-Fi, 64GB, Prateado - MPQ03BZ/A</h3>
            <p>R$ 3799,99</p>
            <Link className="link" to="/products/detail?productId=11">Compre agora <BsArrowRight /></Link>
          </div>
          <div className="img-box">
            <img src="./img/slider-img.png" alt="Imagem slider iPad" />
          </div>
        </div>
      </div>
    </main>
  );
}

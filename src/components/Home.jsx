import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { BsArrowRight, BsCurrencyDollar, BsEye } from "react-icons/bs";
import { BiHeadphone } from "react-icons/bi";
import { FiTruck } from "react-icons/fi";
import { AiOutlineCloseCircle, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";
import HomeProduct from "../scripts/homeProduct.js";
import addCartAnimation from "../scripts/addCartAnimation.js";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Home.css";

const Home = ({ detail, closeDetail, setCloseDetail, viewProduct, addToCart }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [homeProduct, setHomeProduct] = useState(HomeProduct);
  const sliderSettings = {
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    variableWidth: true,
    initialSlide: 1,
  }

  return (
    <>   {
      closeDetail && (
        <div className="product-detail">
          <div className="container">
            <button className="close-button" onClick={() => setCloseDetail(false)}><AiOutlineCloseCircle /></button>
            {
              detail.map((curElm) => {
                return (
                  <div className="product-box" key={curElm.id}>
                    <div className="img-box">
                      <img src={curElm.img} alt={curElm.title} />
                    </div>
                    <div className="detail">
                      <h4>{curElm.category}</h4>
                      <h2>{curElm.title}</h2>
                      <p>{curElm.description}</p>
                      <h3>{curElm.price}</h3>
                      {
                        isAuthenticated ?
                          <button className="button-detail" onClick={(e) => { addToCart(curElm); addCartAnimation(e) }}>Adicionar ao carrinho</button>
                          :
                          <button onClick={() => loginWithRedirect()}>Adicionar ao carrinho</button>
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
      <div className="top-banner">
        <div className="container">
          <div className="detail">
            <h2>A Melhor Coleção de Notebooks</h2>
            <Link className='link' to="/product">Compre agora <BsArrowRight /></Link>
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
        <div className="container">
          {
            homeProduct.map((curElm) => {
              return (
                <div className="box" key={curElm.id}>
                  <div className="img-box">
                    <img src={curElm.img} alt={curElm.title} />
                    <div className="icon">
                      {
                        isAuthenticated ?
                          <li className="button-product" onClick={(e) => { addToCart(curElm); addCartAnimation(e) }}><AiOutlineShoppingCart /></li>
                          :
                          <li onClick={() => loginWithRedirect()}><AiOutlineShoppingCart /></li>
                      }
                      <li onClick={() => viewProduct(curElm)}><BsEye /></li>
                      <li><AiOutlineHeart /></li>
                    </div>
                  </div>
                  <div className="detail">
                    <p>{curElm.category}</p>
                    <h3>{curElm.title}</h3>
                    <h4>{curElm.price}</h4>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="banner">
        <div className="container">
          <div className="detail">
            <h4>A Mais Recente Tecnologia</h4>
            <h3>Apple iPad 10.9" 10ª Geração, Wi-Fi, 64GB, Prateado - MPQ03BZ/A</h3>
            <p>R$ 3799,99</p>
            <Link className="link" to="/product">Compre agora <BsArrowRight /></Link>
          </div>
          <div className="img-box">
            <img src="./img/slider-img.png" alt="Imagem slider iPad" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
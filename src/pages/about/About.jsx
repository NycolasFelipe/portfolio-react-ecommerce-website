import React from "react";
import "./About.css";

export const About = () => {
  return (
    <div className="about-container">
      <div className="container">
        <div className="top">
          <h2>Sobre nós</h2>
          <p>Na <b>shop</b> você encontra tudo o que precisa para equipar sua casa com os melhores eletrônicos do mercado. Oferecemos uma grande variedade de produtos de marcas renomadas, com preços imperdíveis e condições de pagamento facilitadas.</p>
        </div>
        <div className="content">
          <div className="container sobre">
            <div className="text">
              <h3>Sobre a shop</h3>
              <p>Somos apaixonados por tecnologia e acreditamos que ela tem o poder de transformar a vida das pessoas.</p>
              <p>Na nossa loja online, você encontra tudo o que precisa para se conectar com o mundo e aproveitar ao máximo o que a tecnologia tem a oferecer. Oferecemos uma grande variedade de produtos de marcas renomadas, com preços imperdíveis e condições de pagamento facilitadas.</p>
              <h3>Nossa missão</h3>
              <ul>
                <li>Oferecer aos nossos clientes a melhor experiência de compra online possível.</li>
                <li>Fornecer produtos de alta qualidade com preços competitivos.</li>
                <li>Oferecer um atendimento ao cliente impecável.</li>
                <li>Contribuir para a democratização do acesso à tecnologia.</li>
              </ul>
            </div>
            <div className="img-box">
              <img src="../img/about_us_1.svg" alt="About us image" />
            </div>
          </div>
          <div className="container valores">
            <div className="text">
              <h3>Nossos valores</h3>
              <ul>
                <li><b>Confiança:</b> Acreditamos na importância de construir relações de confiança com nossos clientes.</li>
                <li><b>Qualidade:</b> Oferecemos apenas produtos de alta qualidade que atendam às necessidades dos nossos clientes.</li>
                <li><b>Inovação:</b> Estamos sempre buscando novas maneiras de melhorar a experiência de compra dos nossos clientes e oferecer produtos inovadores.</li>
                <li><b>Sustentabilidade:</b> Nos preocupamos com o meio ambiente e adotamos práticas sustentáveis em nossas operações.</li>
                <li><b>Responsabilidade social:</b> Apoiamos causas sociais e ambientais importantes para nós.</li>
              </ul>
            </div>
            <div className="img-box">
              <img src="../img/about_us_2.png" alt="About us image" />
            </div>
          </div>
          <div className="container comprar">
            <div className="text">
              <h3>Por que comprar conosco?</h3>
              <ul>
                <li><b>Grande variedade de produtos:</b> Oferecemos a maior variedade de produtos tecnológicos do mercado, com produtos de todas as marcas e preços.</li>
                <li><b>Preços imbatíveis:</b> Garantimos os melhores preços do mercado, com promoções imperdíveis e condições de pagamento facilitadas.</li>
                <li><b>Entrega rápida e segura:</b> Entregamos seus produtos em todo o Brasil com rapidez e segurança.</li>
                <li><b>Atendimento ao cliente impecável:</b> Nossa equipe de atendimento ao cliente está sempre à disposição para te ajudar em tudo o que você precisar.</li>
                <li><b>Compra segura:</b> Oferecemos um ambiente de compra seguro para que você possa fazer suas compras com tranquilidade.</li>
              </ul>
            </div>
            <div className="img-box">
              <img src="../img/about_us_3.png" alt="About us image" />
            </div>
          </div>
          <div className="container junte-se">
            <div className="text">
              <h3>Junte-se a nós e faça parte da nossa comunidade!</h3>
              <p>Acreditamos que a tecnologia deve ser acessível a todos e que ela pode ajudar a melhorar a vida das pessoas.</p>
              <p>Na nossa loja online, você encontrará tudo o que precisa para se conectar com o que importa para você e aproveitar ao máximo o que a tecnologia tem a oferecer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import UserContext from "./context/user/UserContext";
import { useNavigate } from "react-router-dom";
import { Warning } from "./components/warning/Warning";
import { Nav } from "./components/nav/Nav";
import { Footer } from "./components/footer/Footer";
import { Routing } from "./router/Routing";
import removeDiacritcs from "./scripts/removeDiacritcs";
import getProduct from "./api/getProduct";
import getProductInfo from "./scripts/getProductInfo";
import createUser from "./api/createUser";
import getUser from "./api/getUser";
import { useAuth0 } from "@auth0/auth0-react";
import { Analytics } from "@vercel/analytics/react"
import "./App.css";

export const App = () => {
  const navigate = useNavigate();
  const { getIdTokenClaims } = useAuth0();
  const [product, setProduct] = useState([]);
  const [initialProduct, setInitialProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [warning, setWarning] = useState(false);
  const userLoginCheckCount = useRef(0);

  // Cria usuário ao logar pela primeira vez
  function handleUserLogged() {
    const interval = setInterval(() => {
      // Inicia tentativas de obter dados do usuário
      if (userLoginCheckCount.current < 20) {
        userLoginCheckCount.current++;
        getIdTokenClaims().then((token) => {
          // Quando os dados forem obtidos, encerra as tentativas
          if (token) {
            clearInterval(interval);
            createUser(token);
            getUser(token)
              .then((data) => setUser(data))
              .catch((error) => console.debug(error));
            return;
          }
        });
      } else {
        setWarning(true);
        clearInterval(interval);
      }
    }, 500);
  }

  // Adicionar ao carrinho
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    const productId = product.ProductId;
    let productAdded = false;
    cart?.map(e => {
      if (e.ProductId === productId) {
        e.qtd++;
        productAdded = true;
        return null;
      }
    });
    if (!productAdded) {
      getProductInfo(product.ProductId).then((productItem) => {
        // Adiciona item somente se houver disponível em estoque
        if (productItem.Info[0].Stock > 0) {
          setCart([...cart, { ...productItem, qtd: 1 }]);
        }
      });
    }
  }

  // Modal com detalhes do produto
  const [closeDetail, setCloseDetail] = useState(false);
  const [detail, setDetail] = useState([]);
  const viewProduct = (product) => {
    setDetail([{ ...product }]);
    setCloseDetail(true);
  }

  // Pesquisar produtos
  const [search, setSearch] = useState("");
  const searchButton = (product) => {
    if (product) {
      // Redireciona para página de pesquisa
      const currentURL = window.location.pathname;
      if (!currentURL.includes("products")) {
        navigate("/products");
      }
      const change = initialProduct.filter((x) => {
        const productCategory = removeDiacritcs(x.Category).toLowerCase().trim();
        const productTitle = removeDiacritcs(x.Title).toLowerCase().trim();
        product = removeDiacritcs(product).toLowerCase().trim();
        return productCategory.includes(product) || productTitle.includes(product);
      });
      setProduct(change);
      setSearch("");

      // Exibe texto de resultado da pesquisa
      setTimeout(() => {
        const resultadoPesquisa = document.querySelector(".products > .products-header .search-results");
        if (resultadoPesquisa) {
          resultadoPesquisa.classList.remove("hide");
          resultadoPesquisa.innerHTML = change.length > 0 ?
            `<p>Resultados de busca para "<span class="term">${search}</span>":</p>` :
            `<p>Não foi possível encontrar resultados para "<span class="term">${search}</span>"</p>`;
        }
      }, 10);
    }
  }

  // Filtrar produtos
  const filterProduct = (category) => {
    if (category === "All") {
      setProduct(initialProduct);
    } else {
      const update = initialProduct.filter((e) => {
        return e.Category === category;
      });
      setProduct(update);
    }

    // Limpa resultados de pesquisa
    const resultadoPesquisa = document.querySelector(".products > .products-header .search-results");
    resultadoPesquisa && resultadoPesquisa.classList.add("hide");
  }

  useEffect(() => {
    // Carregar produtos
    getProduct().then((data) => {
      const categories = !data ? [] : data.reduce((categories, product, index) => {
        const category = product.Category;
        if (categories.indexOf(category) === -1) {
          categories.push(category);
        }
        if (index === data.length - 1) {
          return categories.sort();
        }
        return categories;
      }, []);

      setCategories(categories);
      setProduct(data);
      setInitialProduct(data);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    });

    handleUserLogged();
  }, []);

  return (
    <>
      <Warning warning={warning} />
      <Nav
        search={search}
        setSearch={setSearch}
        searchButton={searchButton}
      />
      <UserContext.Provider value={{ user, setUser }}>
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
          filterProduct={filterProduct}
          categories={categories}
          loading={loading}
        />
      </UserContext.Provider>
      <Footer />
      <Analytics />
    </>
  );
}

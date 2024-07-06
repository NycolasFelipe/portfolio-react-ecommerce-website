import React, { useCallback, useEffect, useRef, useState } from "react";
import UserContext from "./context/user/UserContext";
import { useNavigate } from "react-router-dom";
import { Warning } from "./components/warning/Warning";
import { Nav } from "./components/nav/Nav";
import { Footer } from "./components/footer/Footer";
import { Routing } from "./router/Routing";
import { useAuth0 } from "@auth0/auth0-react";
import { Analytics } from "@vercel/analytics/react"
import { MiniCart } from "./components/miniCart/MiniCart";
import removeAccents from "./scripts/removeAccents";
import getProduct from "./api/getProduct";
import getProductInfo from "./scripts/getProductInfo";
import createUser from "./api/createUser";
import getUser from "./api/getUser";
import paginate from "./scripts/paginate";
import "./App.css";

export const App = () => {
  const navigate = useNavigate();
  const { getIdTokenClaims, isAuthenticated } = useAuth0();
  const [product, setProduct] = useState([]);
  const [initialProduct, setInitialProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [warning, setWarning] = useState(false);
  const [miniCart, setMiniCart] = useState({ visible: false });
  const userLoginCheckCount = useRef(0);
  const dataPerPage = useRef(15);

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
              .then((data) => setUser(data[0]))
              .catch((error) => console.debug(error));
            return;
          }
        }).catch((error) => console.debug(error));
      } else {
        // Somente exibe aviso se o usuário estiver logado, mas não tiver
        // sido possível resgatar seus dados
        if (isAuthenticated) {
          setWarning(true);
        }
        clearInterval(interval);
      }
    }, 500);
  }

  // Adicionar produto aos favoritos
  const addFavorite = (product) => {
    if (favorites.length === 0) {
      favorites.push(product);
    } else {
      const unique = favorites.filter((curElm) => {
        return (curElm.ProductId === product.ProductId)
      }).length === 0;

      if (unique) {
        setFavorites([...favorites, product]);
      } else {
        setFavorites(favorites.filter((x) => x.ProductId != product.ProductId));
      }
    }
  }

  // Adicionar ao carrinho
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    const productId = product.ProductId;
    let productAdded = false;
    // Caso o item já exista no carrinho, cria uma cópia do carrinho,
    // modifica a quantidade do item, e atualiza o estado do cart
    const cartCopy = JSON.parse(JSON.stringify(cart));
    cartCopy?.map(e => {
      if (e.ProductId === productId) {
        e.qtd++;
        productAdded = true;
        return null;
      }
    });
    if (productAdded) {
      setCart(cartCopy);
    }
    // Caso contrário, adiciona um item novo ao carrinho através do setState
    else {
      getProductInfo(product.ProductId).then((productItem) => {
        // Adiciona item somente se houver disponível em estoque
        if (productItem.Info.Stock > 0) {
          setCart([...cart, { ...productItem, qtd: 1 }]);
        }
      });
    }

    setTimeout(() => {
      // Exibe o minicart automaticamente somente ao preencher o carrinho com o primeiro item
      if (cart.length === 0) {
        setMiniCart({ ...miniCart, visible: true });
      }
    }, 300);
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
  const searchButton = (searchTerm) => {
    if (searchTerm) {
      // Redireciona para página de pesquisa
      const currentURL = window.location.pathname;
      if (!currentURL.includes("products")) {
        navigate("/products");
      }

      // Array contendo resultados da pesquisa de forma paginada
      const searchProduct = initialProduct.map((curElm) => {
        return curElm.filter(x => {
          const productCategory = removeAccents(x.Category).toLowerCase().trim();
          const productTitle = removeAccents(x.Title).toLowerCase().trim();
          searchTerm = removeAccents(searchTerm).toLowerCase().trim();
          return productCategory.includes(searchTerm) || productTitle.includes(searchTerm);
        });
      });

      // Repagina dados para que sejam exibidos de forma correta
      const paginatedResult = paginate(searchProduct.flat(Infinity));
      setProduct(paginatedResult);

      // Exibe texto de resultado da pesquisa
      setTimeout(() => {
        const resultadoPesquisa = document.querySelector(".products > .products-header .search-results");
        if (resultadoPesquisa) {
          resultadoPesquisa.classList.remove("hide");
          resultadoPesquisa.innerHTML = searchProduct[0].length > 0 ?
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
      const filteredProduct = initialProduct.map((curElm) => {
        return curElm.filter(x => x.Category === category);
      });
      const paginatedResult = paginate(filteredProduct.flat(Infinity));
      setProduct(paginatedResult);
    }

    // Limpa resultados de pesquisa
    const resultadoPesquisa = document.querySelector(".products > .products-header .search-results");
    resultadoPesquisa && resultadoPesquisa.classList.add("hide");
  }

  // Carregar produtos
  const loadProducts = useCallback(async () => {
    getProduct()
      .then((data) => {
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

        // Categorias de produtos
        setCategories(categories);

        // Produtos paginados
        const paginatedData = paginate(data, dataPerPage.current);
        setProduct(paginatedData);
        setInitialProduct(paginatedData);
      })
      .then(() => {
        handleUserLogged();
        setLoading(false);
      })
      .catch((error) => console.debug(error));
  })

  useEffect(() => {
    // Carregar produtos e dados do usuário
    loadProducts();
  }, []);

  return (
    <>
      <Warning warning={warning} />
      <MiniCart
        cart={cart}
        setCart={setCart}
        miniCart={miniCart}
        setMiniCart={setMiniCart}
      />
      <Nav
        search={search}
        setSearch={setSearch}
        searchButton={searchButton}
      />
      <UserContext.Provider value={{ user, setUser }}>
        <Routing
          product={product}
          setProduct={setProduct}
          homeProduct={initialProduct}
          detail={detail}
          closeDetail={closeDetail}
          setCloseDetail={setCloseDetail}
          viewProduct={viewProduct}
          cart={cart}
          setCart={setCart}
          addToCart={addToCart}
          addFavorite={addFavorite}
          favorites={favorites}
          filterProduct={filterProduct}
          categories={categories}
          loading={loading}
          dataPerPage={dataPerPage}
        />
      </UserContext.Provider>
      <Footer />
      <Analytics />
    </>
  );
}

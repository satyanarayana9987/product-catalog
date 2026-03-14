import { useEffect, useReducer } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { getAllProducts, getProductsByCategory } from "../services/api";
import "./HomePage.css";

const initialState = {
  products: [],
  loading: true,
  error: null,
  searchText: "",
  selectedCategory: "all",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "SET_SEARCH":
      return { ...state, searchText: action.payload };

    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };

    default:
      return state;
  }
}

export default function HomePage() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { products, loading, error, searchText, selectedCategory } = state;

  useEffect(() => {

    async function fetchProducts() {

      dispatch({ type: "SET_LOADING", payload: true });

      try {

        const data =
          selectedCategory === "all"
            ? await getAllProducts()
            : await getProductsByCategory(selectedCategory);

        dispatch({ type: "SET_PRODUCTS", payload: data });

      } catch {

        dispatch({
          type: "SET_ERROR",
          payload: "Failed to load products."
        });

      } finally {

        dispatch({ type: "SET_LOADING", payload: false });

      }
    }

    fetchProducts();

  }, [selectedCategory]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Header
        searchText={searchText}
        onSearch={(text) =>
          dispatch({ type: "SET_SEARCH", payload: text })
        }
        selectedCategory={selectedCategory}
        onCategorySelect={(cat) =>
          dispatch({ type: "SET_CATEGORY", payload: cat })
        }
      />

      <Banner />

      {loading && <Loader />}

      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <div className="product-grid">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}

      <Footer />
    </>
  );
}
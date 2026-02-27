import { useEffect, useState } from "react";
import { getAllProducts, getProductsByCategory } from "../services/api";
import ProductCard from "../components/ProductCard.jsx";
import Header from "../components/Header.jsx";
import HeroBanner from "../components/Banner.jsx";
import Loader from "../components/Loader.jsx";
import "./HomePage.css";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      let data;
      if (selectedCategory === "all") {
        data = await getAllProducts();
      } else {
        data = await getProductsByCategory(selectedCategory);
      }

      setProducts(data);
      setLoading(false);
    }

    fetchData();
  }, [selectedCategory]);

  if (loading) return <Loader />;

  // 🔎 Filter by search text
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Header
        onSearch={setSearchText}
        onCategorySelect={setSelectedCategory}
      />
      <HeroBanner />

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
       <div className="footer"><h1>Created by TEAM-CSS</h1></div>
    </>
  );
}
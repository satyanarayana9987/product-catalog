import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, getProductsByCategory } from "../services/api";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/cart.jsx";
import "./ProductDetailPage.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add, remove, has } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);

      try {
        const data = await getProductById(id);
        setProduct(data);

        const related = await getProductsByCategory(data.category);
        setRelatedProducts(related);
      } catch {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <>
        <Header />
        <div className="error-message">
          Error: {error}
          <button onClick={() => navigate(-1)} className="back-btn" type="button">
            Go Back
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="product-page">
        <button className="back-btn" onClick={() => navigate(-1)} type="button">
          Back
        </button>

        <div className="product-container">
          <div className="left-section">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="center-section">
            <h2>{product.title}</h2>

            <p>
              Rating: {product.rating?.rate} ({product.rating?.count} reviews)
            </p>

            <h3>₹ {product.price}</h3>

            <p>{product.description}</p>

            <p>
              <b>Category:</b> {product.category}
            </p>
          </div>

          <div className="right-section">
            <h3>₹ {product.price}</h3>
            <p className="stock">In Stock</p>

            {has(product.id) ? (
              <button
                className="cart-btn"
                onClick={() => remove(product.id)}
                type="button"
              >
                Remove from Cart
              </button>
            ) : (
              <button className="cart-btn" onClick={() => add(product)} type="button">
                Add to Cart
              </button>
            )}

            <button className="buy-btn" type="button" onClick={() => navigate("/cart")}>
              Buy Now
            </button>
          </div>
        </div>

        <div className="related-products">
          <h2>More from this category</h2>

          <div className="related-grid">
            {relatedProducts
              .filter((item) => item.id !== product.id)
              .slice(0, 8)
              .map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}


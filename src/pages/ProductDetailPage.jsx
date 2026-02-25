import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/api";
import Loader from "../components/Loader.jsx";
import Header from "../components/Header.jsx";
import "./ProductDetailPage.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;

  return (
  <>
    <Header />

    <div className="product-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-content">
        {/* Left Image */}
        <div className="image-section">
          <img src={product.image} alt={product.title} />
        </div>

        {/* Right Info */}
        <div className="info-section">
          <h2>{product.title}</h2>

          <p className="rating">
            ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
          </p>

          <h3 className="price">₹ {product.price}</h3>

          <p className="description">{product.description}</p>

          <p className="category">
            <b>Category:</b> {product.category}
          </p>

          <button className="cart-btn">Add to Cart</button>
          <button className="buy-btn">Buy Now</button>
        </div>
      </div>
    </div>
  </>
  );
}
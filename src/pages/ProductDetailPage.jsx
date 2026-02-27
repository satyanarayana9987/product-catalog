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

      <div className="product-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="product-container">
          
          {/* LEFT - Image */}
          <div className="left-section">
            <img src={product.image} alt={product.title} />
          </div>

          {/* CENTER - Product Info */}
          <div className="center-section">
            <h2 className="title">{product.title}</h2>

            <div className="rating">
              ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
            </div>

            <hr />

            <h3 className="price">₹ {product.price}</h3>

            <p className="description">{product.description}</p>

            <p className="category">
              <b>Category:</b> {product.category}
            </p>
          </div>

          {/* RIGHT - Purchase Box */}
          <div className="right-section">
            <h3 className="price">₹ {product.price}</h3>
            <p className="stock">In Stock</p>

            <button className="cart-btn">Add to Cart</button>
            <button className="buy-btn">Buy Now</button>
          </div>
        </div>
             <div className="footer"><h1>Created by TEAM-CSS</h1></div>
      </div>
    </>
  );
}
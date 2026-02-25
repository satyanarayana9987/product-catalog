import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img src={product.image} alt={product.title} />
      <h4>{product.title}</h4>
      <p>₹ {product.price}</p>
    </div>
  );
}
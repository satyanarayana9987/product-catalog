import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/cart.jsx";
import "./CartPage.css";

function formatMoney(amount) {
  const value = Number(amount);
  if (!Number.isFinite(value)) return "₹ 0";
  return `₹ ${value.toFixed(2)}`;
}

export default function CartPage() {
  const navigate = useNavigate();
  const { items, itemCount, subtotal, setQty, remove, clear } = useCart();

  return (
    <>
      <Header />

      <div className="cart-page">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <div className="cart-header-actions">
            <button className="cart-secondary" type="button" onClick={() => navigate("/home")}>
              Continue shopping
            </button>
            <button
              className="cart-secondary"
              type="button"
              onClick={clear}
              disabled={items.length === 0}
            >
              Clear cart
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>No items in cart.</p>
            <button className="cart-primary" type="button" onClick={() => navigate("/home")}>
              Browse products
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="cart-item">
                  <button
                    type="button"
                    className="cart-item-media"
                    onClick={() => navigate(`/product/${product.id}`)}
                    aria-label={`Open ${product.title}`}
                  >
                    <img src={product.image} alt={product.title} />
                  </button>

                  <div className="cart-item-info">
                    <button
                      type="button"
                      className="cart-item-title"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.title}
                    </button>
                    <div className="cart-item-price">{formatMoney(product.price)}</div>

                    <div className="cart-item-controls">
                      <div className="qty">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => setQty(product.id, qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="qty-value">{qty}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => setQty(product.id, qty + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() => remove(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-total">
                    {formatMoney(Number(product.price) * qty)}
                  </div>
                </div>
              ))}
            </div>

            <aside className="cart-summary">
              <h3>Summary</h3>
              <div className="summary-row">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <button className="cart-primary" type="button">
                Checkout
              </button>
              <p className="summary-note">Checkout is a demo button.</p>
            </aside>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}


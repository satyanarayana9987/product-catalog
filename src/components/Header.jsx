import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../services/api";
import SearchBar from "./SearchBar";
import CategoryMenu from "./CategoryMenu";
import { useCart } from "../context/cart.jsx";
import "./Header.css";

export default function Header({
  searchText = "",
  onSearch = () => {},
  selectedCategory = "all",
  onCategorySelect = () => {},
}) {

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const { itemCount } = useCart();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      }
    }
    fetchCategories();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="header">

      <div className="header-top">

        <Link to="/" className="logo">
          KL<span>-CATALOG</span>
        </Link>

        <div className="header-search">
          <SearchBar value={searchText} onChange={onSearch} />
          {user && (
            <button
              type="button"
              className="cart-icon-btn"
              onClick={() => navigate("/cart")}
              aria-label="Open cart"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="cart-icon">
                <path d="M6.3 6.3h15l-1.4 7.1a2 2 0 0 1-2 1.6H8.1a2 2 0 0 1-2-1.6L4.5 3.8H2.8a1 1 0 1 1 0-2h2.5a1 1 0 0 1 1 .8l1 3.7Zm2.6 16.2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
              </svg>
              {itemCount > 0 ? <span className="cart-badge">{itemCount}</span> : null}
            </button>
          )}
        </div>

        {user && (
          <div className="user-actions">
            <span className="username">{user}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

      </div>

      <div className="header-bottom">

        {error && <p className="error">{error}</p>}

        <CategoryMenu
          categories={categories}
          selected={selectedCategory}
          onSelect={onCategorySelect}
        />

      </div>

    </header>
  );
}
// Improved by Chaithanya: minor readability update
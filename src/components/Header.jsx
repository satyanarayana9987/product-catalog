import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../services/api";
import "./Header.css";

export default function Header({ onSearch, onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const user = localStorage.getItem("user");

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className="header">
      <Link to="/" className="logo">ShopMart</Link>

      {/* Search */}
      <input
        className="search"
        placeholder="Search products..."
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />

      {/* Categories */}
      <div className="nav-links">
        <span onClick={() => onCategorySelect && onCategorySelect("all")}>
          All
        </span>

        {categories.map((cat) => (
          <span
            key={cat}
            onClick={() => onCategorySelect && onCategorySelect(cat)}
          >
            {cat}
          </span>
        ))}

        {/* User Info */}
        {user && <span>{user}</span>}

        {/* Logout */}
        {user && (
          <span onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </span>
        )}
      </div>
    </header>
  );
}
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../services/api";
import "./Header.css";

export default function Header({ onSearch, onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

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
    navigate("/login");
  };

  return (
    <header className="header">
      <Link to="/" className="logo">KL-CATALOG</Link>

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
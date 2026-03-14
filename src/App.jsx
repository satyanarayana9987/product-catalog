import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";

function App() {
const [isAuthenticated, setIsAuthenticated] = useState(
localStorage.getItem("auth") === "true"
);

return (
  <Routes>
    {/* Default route */}
    <Route
      path="/"
      element={
        isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
      }
    />

    {/* Home */}
    <Route
      path="/home"
      element={
        isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
      }
    />

    {/* Product details */}
    <Route
      path="/product/:id"
      element={
        isAuthenticated ? <ProductDetailPage /> : <Navigate to="/login" replace />
      }
    />

    {/* Cart */}
    <Route
      path="/cart"
      element={isAuthenticated ? <CartPage /> : <Navigate to="/login" replace />}
    />

    {/* Login */}
    <Route
      path="/login"
      element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
    />

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
}

export default App;

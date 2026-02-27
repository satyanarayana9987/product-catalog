import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage"; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/home"
        element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
      />

      <Route
        path="/product/:id"
        element={isAuthenticated ? <ProductDetailPage /> : <Navigate to="/login" />}
      />

      <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
    </Routes>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./components/LoginPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
      />

      <Route
        path="/product/:id"
        element={isAuthenticated ? <ProductDetailPage /> : <Navigate to="/login" />}
      />

      <Route
        path="/login"
        element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
      />
    </Routes>
  );
}

export default App;
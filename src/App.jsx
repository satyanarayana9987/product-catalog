import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./components/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/home" />
          ) : (
            <LoginPage setIsAuthenticated={setIsAuthenticated} />
          )
        }
      />

      <Route
        path="/home"
        element={
          isAuthenticated ? (
            <HomePage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;
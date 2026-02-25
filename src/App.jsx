import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import LoginPage from "./components/LoginPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
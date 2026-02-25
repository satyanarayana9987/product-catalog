import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const users = [
  { username: "admin", password: "1234" },
  { username: "2500030164", password: "satya" },
  { username: "2500030104", password: "chaithu" },
  { username: "2500031371", password: "simhadhar" }
];

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const validUser = users.find(
      (user) =>
        user.username === username.trim() &&
        user.password === password.trim()
    );

    if (validUser) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("user", username);
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>SHOPMART LOGIN 🛒</h2>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
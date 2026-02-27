import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

const users = [
  { username: "admin", password: "1234" },
  { username: "2500030164", password: "satya" },
  { username: "2500030104", password: "chaithu" },
  { username: "2500031371", password: "simhadhar" }
];

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const validUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (validUser) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("user", username);
      setIsAuthenticated(true);
      navigate("/");
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>SSC LOGIN 🛒</h2>

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

        <p>
          Created by P.Chaithanya Raj, M.Satyanarayana, J.Simhadhar
        </p>
      </form>
    </div>
  );
};

export default Login;
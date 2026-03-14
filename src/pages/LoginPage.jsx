import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const users = [
  { username: "admin", password: "1234" },
  { username: "2500030164", password: "satya" },
  { username: "2500030104", password: "chaithu" },
  { username: "2500031371", password: "simhadhar" },
];

export default function LoginPage({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }
    const validUser = users.find(u => u.username === username && u.password === password);
    if (validUser) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("user", username);
      setIsAuthenticated(true);
      navigate("/home");
    } else setError("Invalid Credentials");
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>SSC LOGIN 🛒</h2>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        <p>© 2026 Koneru Lakshmaiah Education Foundation (KL University).
This content is used for educational purposes only. All rights belong 
to the respective owners.</p>
      </form>
    </div>
  );
}
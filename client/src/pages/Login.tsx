import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Mot de passe incorrect.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Connexion Admin
        </h2>
        <input
          type="password"
          placeholder="Mot de passe admin"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;

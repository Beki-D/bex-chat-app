import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Log form submission
    console.log("Email:", email); // Log email
    console.log("Password:", password); // Log password

    try {
      const { data } = await login({ variables: { email, password } });
      console.log("Login successful, token:", data.login.token); // Log successful login
      localStorage.setItem("token", data.login.token);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg">
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 rounded-md bg-gray-700 text-white"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 rounded-md bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/signup" className="text-blue-500 hover:underline">
            Don't have an account? Signup
          </Link>
        </div>
        <p className="text-black hover:text-gray-600">bk14drobs@gmail.com</p>{" "}
        <p className="text-black hover:text-gray-600">Beki123Password</p>
        <p className="text-black">...</p>
        <p className="text-black hover:text-gray-600">alex@email.com</p>{" "}
        <p className="text-black hover:text-gray-600">123</p>
      </div>
    </div>
  );
};

export default Login;

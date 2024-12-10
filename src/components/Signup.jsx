import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [signup] = useMutation(SIGNUP_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await signup({
        variables: { name, email, password },
      });
      localStorage.setItem("token", data.signup.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg">
          {error && (
            <div className="mb-4 bg-red-500 text-white p-2 rounded">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 rounded-md bg-gray-700 text-white"
            />
          </div>
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
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

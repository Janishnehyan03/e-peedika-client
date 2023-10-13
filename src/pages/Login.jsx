import React, { useState } from "react";
import Axios from "../Axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";
import { UserAuthContext } from "../context/UserAuth";
import { useContext } from "react";

function Login() {
  const { authData } = useContext(UserAuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (authData) {
    return <Redirect to="/" />;
  }

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await Axios.post("/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        setLoading(false);
        toast.success(res.data.message, {
          position: "top-right",
        });
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <div className="container py-16">
        <ToastContainer />
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl font-medium mb-4">Login</h2>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
            />
          </div>

          {loading ? (
            <button
              className="bg-blue-900 text-white w-full py-2 rounded hover:bg-blue-800 transition"
            >
              Processing...
            </button>
          ) : (
            <button
              className="bg-blue-900 text-white w-full py-2 rounded hover:bg-blue-800 transition"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;

import { useState } from "react";
import cloudbalance from "../assets/cloudbalance.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function LogInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("firstName", response.data.firstName);
      localStorage.setItem("lastName", response.data.lastName);
      localStorage.setItem("expiresAt", Date.now() + response.data.expiresIn * 1000);

      // Navigate based on role
      const role = response.data.role;
      if (role === 'customer') {
        navigate("/dashboard/costexplorer", { replace: true });
      } else {
        navigate("/dashboard/users", { replace: true });
      }
    } else {
      setError("Login failed. No token received.");
    }
  } catch (error) {
    if (error.response) {
      setError("Invalid email or password");
    } else if (error.request) {
      setError("Cannot connect to server. Please try again.");
    } else {
      setError("An error occurred. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <img
              src={cloudbalance}
              alt="CloudBalanceIMG"
              className="w-48 h-auto mx-auto"
            />
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="emailfld"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="emailfld"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="passwordfld"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="passwordfld"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {err && (
              <p className="text-red-600 text-sm mb-3 text-center">{err}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-sm font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-gray-700"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>

      <footer className="py-3 px-6 text-sm text-gray-600 border-t bg-gray-100 flex justify-between">
        <p>
          Have a Question?{" "}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Talk to Our Team
          </span>
        </p>
        <p>© Cloudnomic 2025 | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default LogInPage;

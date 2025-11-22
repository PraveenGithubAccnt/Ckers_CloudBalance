import cloudbalance from "../assets/cloudbalance.png";
import { Link, useNavigate } from "react-router-dom";

function LogInPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("auth", "true");
    navigate("/dashboard/users");
  };

  return (
    <div className="min-h-screen flex flex-col">
   
      <div className="grow flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <img
              src={cloudbalance}
              alt="CloudBalanceIMG"
              className="w-50 h-auto mx-auto"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                id="emailfld"
                placeholder="Enter your Email"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                id="passwordfld"
                placeholder="Enter your Password"
              />
            </div>

            <div className="text-right mb-4">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-sm hover:bg-blue-700 transition duration-150 ease-in-out font-semibold"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>

      <footer className="py-3 px-6 text-sm text-gray-600 border-t border-gray-300 bg-gray-100 w-full flex justify-between items-center">
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

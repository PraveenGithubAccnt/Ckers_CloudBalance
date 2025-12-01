import React from "react";
import { Link } from "react-router-dom";
import NotFoundImg from "../assets/notfound.jpg";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      
      <h3 className="text-3xl font-semibold text-blue-500 mb-4 tracking-wide">
        Ooops..
      </h3>

      <img
        src={NotFoundImg}
        alt="404 Not Found"
        className="w-72 sm:w-96 rounded-xl shadow-lg mb-6"
      />

      <p className="text-gray-600 text-lg mb-4">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all duration-200"
      >
        Go Back Home
      </Link>

    </div>
  );
}

export default NotFound;

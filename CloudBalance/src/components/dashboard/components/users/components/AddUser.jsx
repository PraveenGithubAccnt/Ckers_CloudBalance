import { useState } from "react";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function AddUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isEdit } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: user?.FirstName || "",
    lastName: user?.LastName || "",
    email: user?.Email || "",
    role: user?.Roles?.[0] || "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e) => {
    const fieldName = e.target.id;
    const fieldValue = e.target.value;

    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Email: formData.email,
        Roles: [formData.role],
      };

      if (isEdit && user) {
        await axios.put(
          `https://692030d331e684d7bfcc0967.mockapi.io/Users/${user.id}`,
          userData
        );
        setToastMessage("User updated successfully!");
      } else {
        await axios.post(
          "https://692030d331e684d7bfcc0967.mockapi.io/Users",
          userData
        );
        setToastMessage("User created successfully!");
      }

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate("/dashboard/users");
      }, 1500);
    } catch (error) {
      console.error("Error saving user:", error);
      setToastMessage("Failed to save user. Please try again.");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <div>
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50">
          {toastMessage}
        </div>
      )}

      <div className="bg-white p-4 rounded-md">
        <h2 className="text-xl font-semibold">
          {isEdit ? "Edit User" : "Add New User"}
        </h2>
      </div>
      <div className="bg-white mt-4 rounded-md p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-10 mb-4">
            <div className="mb-4 w-72">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1 after:content-['*'] after:text-red-500 after:ml-1"
              >
                First Name
              </label>
              <input
                className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                type="text"
                id="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 w-72">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1 after:content-['*'] after:text-red-500 after:ml-1"
              >
                Last Name
              </label>
              <input
                className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                type="text"
                id="lastName"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Row 2 */}
          <div className="flex gap-10 mb-4">
            <div className="mb-4 w-72">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1 after:content-['*'] after:text-red-500 after:ml-1"
              >
                Email
              </label>
              <input
                className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                type="email"
                id="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 w-72">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Role
              </label>
              <select
                id="role"
                className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="readonly">Read-Only</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 ml-110">
            <button
              type="submit"
              className="flex gap-2 items-center bg-blue-500 hover:bg-blue-700 text-white text-base rounded-md p-2 cursor-pointer"
              title="Submit Details"
            >
              <BsFillSendArrowUpFill size={20} />
              <span>{isEdit ? "Update" : "Submit"}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/users")}
              className="flex gap-2 items-center bg-gray-500 hover:bg-gray-700 text-white text-base rounded-md p-2 cursor-pointer"
              title="Cancel"
            >
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;

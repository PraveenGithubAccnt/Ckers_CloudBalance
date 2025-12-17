import { useState } from "react";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { createUser,updateUser } from "../../../../../api/userApi";

function AddUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isEdit } = location.state || {};

  const [formData, setFormData] = useState({
    userFirstName: user?.firstName || "",
    userLastName: user?.lastName || "",
    userEmail: user?.email || "",
    userPassword: user?.password || "",
    userRole: user?.roleName || "",
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

  const userData = {
    firstName: formData.userFirstName,
    lastName: formData.userLastName,
    email: formData.userEmail,
    password: formData.userPassword,
    roleName: formData.userRole,
  };

  try {
    if (isEdit && user) {
      await updateUser(user.id, userData);
      setToastMessage("User updated successfully!");
    } else {
      await createUser(userData);
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
    setTimeout(() => setShowToast(false), 3000);
  }
};

  return (
    <div className="space-y-4">
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50">
          {toastMessage}
        </div>
      )}

      <div className="bg-white p-4 rounded-md shadow-sm">
        <h2 className="text-xl font-semibold">
          {isEdit ? "Edit User" : "Add New User"}
        </h2>
      </div>

      <div className="bg-white mt-4 rounded-md p-6 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6 mb-8">
            <div>
              <label
                htmlFor="userFirstName"
                className="block text-sm font-medium text-gray-700 mb-1 after:content-['*'] after:text-red-500 after:ml-1"
              >
                First Name
              </label>
              <input
                className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                type="text"
                id="userFirstName"
                placeholder="Enter First Name"
                value={formData.userFirstName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="userLastName"
                className="block text-sm font-medium text-gray-700 mb-1 after:content-['*'] after:text-red-500 after:ml-1"
              >
                Last Name
              </label>
              <input
                className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                type="text"
                id="userLastName"
                value={formData.userLastName}
                placeholder="Enter Last Name"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="userEmail"
                className="block text-sm font-medium text-gray-700 mb-1 after:content-['*'] after:text-red-500 after:ml-1"
              >
                Email
              </label>
              <input
                className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                type="email"
                id="userEmail"
                value={formData.userEmail}
                placeholder="Enter Email"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="userpassword"
                className="block text-sm font-medium text-gray-700 mb-1 after:content-['*'] after:text-red-500 after:ml-1"
              >
                Password
              </label>
              <input
                className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                type="password"
                id="userPassword"
                value={formData.userPassword}
                placeholder="Enter Password"
                onChange={handleChange}
                required={!isEdit}

              />
            </div>

            <div>
              <label
                htmlFor="userRole"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Role
              </label>
              <select
                id="userRole"
                value={formData.userRole}
                className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-white"
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="read-only">Read-only</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
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

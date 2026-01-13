import { useState } from "react";
import UserDetailTable from "../../users/components/UserDetailTable";
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function UserManagement() {
  const navigate = useNavigate();
  const {role} =useSelector((state)=>state.auth)
  const isReadOnly =role==='read only'
  const [activeFilter, setActiveFilter] = useState("Active");

  function navigateToForm() {
    if (isReadOnly) return;
    navigate("/dashboard/users/add");
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <div className="bg-white p-3 rounded-sm">
        <div className="flex items-center justify-between mb-3">
          {!isReadOnly && (
            <div className="bg-blue-800 text-center text-white rounded-sm p-2">
              <button
                onClick={navigateToForm}
                className="flex gap-2 items-center cursor-pointer"
                title="Add User"
              >
                <IoMdPersonAdd />
                <p>Add User</p>
              </button>
            </div>
          )}

          <div className="bg-white p-2 border-2 border-blue-700 rounded-4xl flex gap-4">
            <button
              className={`px-6 py-1 rounded-3xl ${
                activeFilter === "Active"
                  ? "bg-blue-800 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveFilter("Active")}
            >
              Active
            </button>

            <button
              className={`px-6 py-1 rounded-3xl ${
                activeFilter === "All"
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveFilter("All")}
            >
              All
            </button>
          </div>
        </div>

        <div className="mt-3 bg-white rounded-sm">
          <UserDetailTable filter={activeFilter} />
        </div>
      </div>
    </div>
  );
}

export default UserManagement;

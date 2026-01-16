import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../../../../api/userApi";
import ActionButtons from "./ActionButtons";
import { CgSearchLoading } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
function UserDetailTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);
  // const [user, setUser] = useState(null);

  const { role } = useSelector((state) => state.auth);
  const isReadOnly = role === "read only";
  const navigate = useNavigate();
  
  const handleEdit = (user) => {
    if (isReadOnly) return;
    navigate("/dashboard/users/add", { state: { user, isEdit: true } });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (userEmail) => {
    if (isReadOnly) return;
    setSelectedUserEmail(userEmail);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(selectedUserEmail);
      setUsers((prev) => prev.filter((user) => user.email !== selectedUserEmail));
      toast.success(" User Delete successfully!")
    } catch (error) {
      console.error("Error deleting user:", error);
     toast.error("Faild To Delete User!")
    } finally {
      setShowConfirm(false);
      setSelectedUserEmail(null);
    }
  };

  if (loading)
    return (
      <div className="flex p-4 item-center justify-center text-blue-500">
        <CgSearchLoading size={50} />
        <span className="text-3xl">Loading....</span>
      </div>
    );
  if (error)
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="mb-2 text-sm text-gray-600">
        Total Users: {users.length}
      </div>
      <div className="flex-1 min-h-0 border border-gray-200 rounded-lg bg-white overflow-hidden">
        <div className="h-full overflow-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-blue-800 z-10">
              <tr className="text-white">
                <th className="p-3 text-left border-b border-gray-200">
                  First Name
                </th>
                <th className="p-3 text-left border-b border-gray-200">
                  Last Name
                </th>
                <th className="p-3 text-left border-b border-gray-200">
                  Email ID
                </th>
                <th className="p-3 text-left border-b border-gray-200">Role</th>

                <th className="p-3 text-left border-b border-gray-200 w-[140px]">
                  {!isReadOnly ? "Actions" : ""}
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`hover:bg-blue-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3 border-b border-gray-100">
                    {user.firstName}
                  </td>
                  <td className="p-3 border-b border-gray-100">
                    {user.lastName}
                  </td>
                  <td className="p-3 border-b border-gray-100">{user.email}</td>
                  <td className="p-3 border-b border-gray-100">
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-800 text-white">
                        {user.roleName}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 border-b border-gray-100">
                    {!isReadOnly && (
                      <ActionButtons
                        onEdit={() => handleEdit(user)}
                        onDelete={() => handleDelete(user.email)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-50 "></div>

      {showConfirm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetailTable;

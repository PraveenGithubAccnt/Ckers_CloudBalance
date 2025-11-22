import { useEffect, useState } from "react";
import axios from "axios";
import ActionButtons from "./ActionButtons";
import { CgSearchLoading } from "react-icons/cg";
function UserDetailTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://692030d331e684d7bfcc0967.mockapi.io/Users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

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
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr>
                <th className="p-3 text-left border-b border-gray-200">ID</th>
                <th className="p-3 text-left border-b border-gray-200">
                  First Name
                </th>
                <th className="p-3 text-left border-b border-gray-200">
                  Last Name
                </th>
                <th className="p-3 text-left border-b border-gray-200">Role</th>
                <th className="p-3 text-left border-b border-gray-200">
                  Last Login
                </th>
                <th className="p-3 text-left border-b border-gray-200">
                  Actions
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
                  <td className="p-3 border-b border-gray-100">{user.id}</td>
                  <td className="p-3 border-b border-gray-100">
                    {user.FirstName}
                  </td>
                  <td className="p-3 border-b border-gray-100">
                    {user.LastName}
                  </td>
                  <td className="p-3 border-b border-gray-100">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {user.Roles}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-100">
                    {user.LastLogins}
                  </td>
                  <td className="p-3 border-b border-gray-100">
                    <ActionButtons />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-50 "></div>
    </div>
  );
}

export default UserDetailTable;

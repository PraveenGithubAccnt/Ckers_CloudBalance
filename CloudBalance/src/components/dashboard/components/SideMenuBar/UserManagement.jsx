import UserDetailTable from "../../../users/components/UserDetailTable";
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function UserManagement() {
  const navigate = useNavigate();

  function navigateToForm() {
    navigate("/dashboard/users/add");
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <div className="bg-white p-3 rounded-sm">
        
        <div className="bg-blue-700 w-30 text-center text-white rounded-sm p-2 ">
          <button
            onClick={navigateToForm}
            className="flex gap-2 items-center cursor-pointer"
            title="Add User">
            <IoMdPersonAdd /> <p>Add User</p>
          </button>
        </div>

        <div className="mt-3 bg-white rounded-sm">
          <UserDetailTable />
        </div>
      </div>
    </div>
  );
}

export default UserManagement;

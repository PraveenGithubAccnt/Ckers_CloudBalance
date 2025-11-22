import UserDetailTable from "../../users/UserDetailTable";
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
      <div className="bg-white p-5 rounded-sm">
        <div className="bg-blue-500 w-30 text-center text-white rounded-sm p-2">
          <button 
          onClick={navigateToForm} 
          className="flex gap-2 items-center"
          title="Add User"
          >
            <IoMdPersonAdd /> <p>Add User</p>
          </button>
        </div>
      </div>
 
 <div className="mt-4 bg-white p-5 rounded-sm">
        <UserDetailTable />
 </div>

    </div>
  );
}

export default UserManagement;

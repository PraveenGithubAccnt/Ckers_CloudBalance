import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
function RightNavSection() {

  const navigate = useNavigate();
  const handleLogOut = () => {
  localStorage.setItem("auth", "false");
  navigate("/");
};

  return (
    <div>
      <div className="flex items-center space-x-8">
        <div className="flex items-center text-left">
          <div className="text-sm">
            <h4 className="text-gray-500 pl-8">Welcome</h4>
            <div className="flex items-center text-blue-600 font-medium space-x-1">
              <CgProfile className="w-8 h-8" />
              <span className="cursor-pointer">Praveen Kushwaha</span>
            </div>
          </div>
        </div>

        <button onClick={handleLogOut} className="flex items-center p-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 text-sm cursor-pointer">
          <BiLogOut className="w-4 h-4 mr-1" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default RightNavSection;

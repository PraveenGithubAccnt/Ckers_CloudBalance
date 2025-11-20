import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
function RightNavSection() {
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

        <button className="flex items-center px-3 py-1.5 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 text-sm">
          <BiLogOut className="w-4 h-4 mr-1" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default RightNavSection;

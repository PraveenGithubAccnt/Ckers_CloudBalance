import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa6";
import { IoToggle } from "react-icons/io5";

function ActionButtons({ onEdit, onDelete, disabled }) {
  return (
    <div className="flex gap-5 items-center">
      {/* Toggle button */}
      <button
        disabled={disabled}
        className={`text-xl transition-colors cursor-pointer ${
          disabled
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-800 hover:text-blue-600"
        }`}
        title={disabled ? "Read Only" : "Disable User"}
      >
        {disabled ? <FaToggleOff /> : <IoToggle />}
      </button>

      {/* Edit button */}
      <button
        onClick={onEdit}
        disabled={disabled}
        className={`text-green-600 transition-colors ${
          disabled ? "cursor-not-allowed opacity-50" : "hover:text-green-700 cursor-pointer"
        }`}
        title="Edit User"
      >
        <FaEdit />
      </button>

      {/* Delete button */}
      <button
        onClick={onDelete}
        disabled={disabled}
        className={`text-red-500 transition-colors ${
          disabled ? "cursor-not-allowed opacity-50" : "hover:text-red-600 cursor-pointer"
        }`}
        title="Delete User"
      >
        <RiDeleteBin5Line />
      </button>
    </div>
  );
}

export default ActionButtons;

import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa6";
import { IoToggle } from "react-icons/io5";
import { useState } from "react";

function ActionButtons({ onEdit, onDelete }) {
  const [isEnabled, setIsEnabled] = useState(true);

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="flex gap-5 items-center">
      <button
        onClick={handleToggle}
        className={`text-xl transition-colors ${
          isEnabled
            ? "text-blue-500 hover:text-blue-600"
            : "text-gray-400 hover:text-gray-500"
        }`}
        title={isEnabled ? "Disable User" : "Enable User"}>
        {isEnabled ? <IoToggle /> : <FaToggleOff />}
      </button>

      <button
        onClick={onEdit}
        className="text-green-600 hover:text-green-700 transition-colors"
        title="Edit User">
        <FaEdit />
      </button>

      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-600 transition-colors"
        title="Delete User"
      >
        <RiDeleteBin5Line />
      </button>
    </div>
  );
}

export default ActionButtons;

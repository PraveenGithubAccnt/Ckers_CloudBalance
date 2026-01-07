import React, { useState } from "react";
import { LuTimerReset } from "react-icons/lu";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

const dummyAccounts = [
  { id: 1, name: "Roni Thomas", accountId: "989033863264" },
  { id: 2, name: "Aircel Money", accountId: "767369465358" },
  { id: 3, name: "Doodhwala", accountId: "237795921511" },
  { id: 4, name: "AI Gym", accountId: "315756860246" },
  { id: 5, name: "Tejprakash Sharma", accountId: "861931862932" },
  { id: 6, name: "Apoyo", accountId: "429796869693" },
  { id: 7, name: "IDFC", accountId: "003429390769" },
  { id: 8, name: "Galadari", accountId: "112512014927" },
];

function ManageAccount() {
  const [available, setAvailable] = useState(dummyAccounts);
  const [associated, setAssociated] = useState([]);
  const [selectedAvailable, setSelectedAvailable] = useState([]);
  const [selectedAssociated, setSelectedAssociated] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter available accounts based on search
  const filteredAvailable = available.filter(
    (acc) =>
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.accountId.includes(searchTerm)
  );

  // Toggle selection
  const toggleSelection = (id, type) => {
    if (type === "available") {
      setSelectedAvailable((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setSelectedAssociated((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    }
  };

  // Select all available
  const selectAllAvailable = (e) => {
    if (e.target.checked) {
      setSelectedAvailable(filteredAvailable.map((a) => a.id));
    } else {
      setSelectedAvailable([]);
    }
  };

  // Move to associated
  const addAccounts = () => {
    const toAdd = available.filter((a) => selectedAvailable.includes(a.id));
    setAssociated([...associated, ...toAdd]);
    setAvailable(available.filter((a) => !selectedAvailable.includes(a.id)));
    setSelectedAvailable([]);
  };

  // Remove from associated
  const removeAccounts = () => {
    const toRemove = associated.filter((a) =>
      selectedAssociated.includes(a.id)
    );
    setAvailable([...available, ...toRemove]);
    setAssociated(
      associated.filter((a) => !selectedAssociated.includes(a.id))
    );
    setSelectedAssociated([]);
  };

  // Reset
  const handleReset = () => {
    setAvailable(dummyAccounts);
    setAssociated([]);
    setSelectedAvailable([]);
    setSelectedAssociated([]);
    setSearchTerm("");
  };

  return (
    <div className="bg-white rounded-md shadow">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Manage Account Id(s)</h3> |
        <button
          onClick={handleReset}
          className="text-sm text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          <LuTimerReset size={16} />
          Reset
        </button>
      </div>

      {/* Main Layout */}
      <div className="p-6">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-6">
          {/* Choose Account IDs */}
          <div className="border border-gray-200 rounded-md bg-gray-50">
            <div className="p-3 bg-white border-b border-gray-200 font-medium flex justify-between items-center">
              <span>Choose Account IDs to Associate</span>
              <span className="text-blue-600 text-sm font-semibold">
                {available.length} Available
              </span>
            </div>

            {/* Search Box */}
            <div className="p-3 bg-white border-b border-gray-200">
              <div className="relative">
                <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Select All */}
            <div className="bg-white border-b border-gray-200">
              <label className="flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={
                    filteredAvailable.length > 0 &&
                    selectedAvailable.length === filteredAvailable.length
                  }
                  onChange={selectAllAvailable}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-medium">Select All</span>
              </label>
            </div>

            {/* Account List */}
            <div className="max-h-80 overflow-y-auto bg-white">
              {filteredAvailable.map((acc, index) => (
                <label
                  key={acc.id}
                  className={`flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAvailable.includes(acc.id)}
                    onChange={() => toggleSelection(acc.id, "available")}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-sm">
                    {acc.name} ({acc.accountId})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              onClick={addAccounts}
              disabled={selectedAvailable.length === 0}
              className="p-3 rounded-full bg-gray-700 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-white"
              title="Add selected accounts"
            >
              <FaArrowRight size={18} />
            </button>
            <button
              onClick={removeAccounts}
              disabled={selectedAssociated.length === 0}
              className="p-3 rounded-full bg-gray-700 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-white"
              title="Remove selected accounts"
            >
              <FaArrowLeft size={18} />
            </button>
          </div>

          {/* Associated Account IDs */}
          <div className="border border-gray-200 rounded-md bg-gray-50">
            <div className="p-3 bg-white border-b border-gray-200 font-medium flex justify-between items-center">
              <span>Associated Account IDs</span>
              <span className="text-blue-600 text-sm font-semibold">
                {associated.length} Added
              </span>
            </div>

            <div className="max-h-96 overflow-y-auto bg-white">
              {associated.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-400 py-20">
                  <FaRegFolderOpen size={64} className="mb-4" />
                  <p className="font-semibold text-lg text-gray-700 mb-1">
                    No Account IDs Added
                  </p>
                  <p className="text-sm">
                    Selected Account IDs will be shown here.
                  </p>
                </div>
              ) : (
                associated.map((acc, index) => (
                  <label
                    key={acc.id}
                    className={`flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAssociated.includes(acc.id)}
                      onChange={() => toggleSelection(acc.id, "associated")}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm">
                      {acc.name} ({acc.accountId})
                    </span>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAccount;
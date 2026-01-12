import { useEffect, useState } from "react";
import { LuTimerReset } from "react-icons/lu";
import { FaArrowRight, FaArrowLeft, FaRegFolderOpen } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { getAllArnAccnt } from "../../../../../api/awsArnApi";

function ManageAccount() {
  const [available, setAvailable] = useState([]);
  const [associated, setAssociated] = useState([]);
  const [selectedAvailable, setSelectedAvailable] = useState([]);
  const [selectedAssociated, setSelectedAssociated] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ FETCH ACCOUNTS ON LOAD
  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await getAllArnAccnt();
      setAvailable(res.data || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load account IDs"
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter 
  const filteredAvailable = available.filter(
    (acc) =>
      acc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.accountId?.includes(searchTerm)
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
    fetchAccounts();
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

    
      <div className="p-6">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-6">
          {/* Available Accounts */}
          <div className="border border-gray-200 rounded-md bg-gray-50">
            <div className="p-3 bg-white border-b border-gray-200 font-medium flex justify-between">
              <span>Choose Account IDs to Associate</span>
              <span className="text-blue-600 text-sm font-semibold">
                {available.length} Available
              </span>
            </div>

            {/* Search */}
            <div className="p-3 bg-white border-b border-gray-200">
              <div className="relative">
                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 py-2 border rounded-md"
                />
              </div>
            </div>

            {/* Select All */}
            <div className="bg-white border-b">
              <label className="flex items-center gap-3 px-3 py-3">
                <input
                  type="checkbox"
                  checked={
                    filteredAvailable.length > 0 &&
                    selectedAvailable.length === filteredAvailable.length
                  }
                  onChange={selectAllAvailable}
                />
                <span className="text-sm font-medium">Select All</span>
              </label>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto bg-white">
              {loading ? (
                <p className="p-4 text-sm text-gray-500">Loading...</p>
              ) : (
                filteredAvailable.map((acc, index) => (
                  <label
                    key={acc.id}
                    className={`flex items-center gap-3 px-3 py-3 hover:bg-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAvailable.includes(acc.id)}
                      onChange={() => toggleSelection(acc.id, "available")}
                    />
                    <span className="text-sm">
                      {acc.name} ({acc.accountId})
                    </span>
                  </label>
                ))
              )}
            </div>
          </div>

          {/* Arrows */}
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              onClick={addAccounts}
              disabled={!selectedAvailable.length}
              className="p-3 rounded-full bg-gray-700 text-white disabled:opacity-30"
            >
              <FaArrowRight />
            </button>
            <button
              onClick={removeAccounts}
              disabled={!selectedAssociated.length}
              className="p-3 rounded-full bg-gray-700 text-white disabled:opacity-30"
            >
              <FaArrowLeft />
            </button>
          </div>

          {/* Associated */}
          <div className="border border-gray-200 rounded-md bg-gray-50">
            <div className="p-3 bg-white border-b font-medium">
              Associated Account IDs ({associated.length})
            </div>

            <div className="max-h-96 overflow-y-auto bg-white">
              {associated.length === 0 ? (
                <div className="flex flex-col items-center py-20 text-gray-400">
                  <FaRegFolderOpen size={48} />
                  <p>No Account IDs Added</p>
                </div>
              ) : (
                associated.map((acc) => (
                  <label
                    key={acc.id}
                    className="flex items-center gap-3 px-3 py-3 hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAssociated.includes(acc.id)}
                      onChange={() =>
                        toggleSelection(acc.id, "associated")
                      }
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

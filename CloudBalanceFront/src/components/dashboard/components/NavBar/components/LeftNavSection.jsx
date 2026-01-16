import { useEffect, useState, useContext } from "react";
import { IoMenu } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import cloudbalance from "../../../../../assets/cloudbalance.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../../../redux/slice/sidebarSlice";
import { setArnAccounts } from "../../../../../redux/slice/authSlice";
import { getUsersById } from "../../../../../api/userApi";
import { AccountContext } from "../../../../../context/AccountContext";

function LeftNavSection() {
  const dispatch = useDispatch();
  const { setSelectedAccountId } = useContext(AccountContext);
  const { role, userId, arnAccounts } = useSelector((state) => state.auth);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [loading, setLoading] = useState(false);

  const isCustomer = role === "customer";

  
  useEffect(() => {
    const fetchUserArnAccounts = async () => {
      setLoading(true);
      try {
        const response = await getUsersById(userId);
        const userData = response.data;

        if (userData.arnAccounts && userData.arnAccounts.length > 0) {
          dispatch(setArnAccounts(userData.arnAccounts));

          
          const defaultAccountId = userData.arnAccounts[0].accountId;
          setSelectedAccount(defaultAccountId);
          setSelectedAccountId(defaultAccountId); 
        }
      } catch (error) {
        console.error("Error fetching user ARN accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isCustomer && userId && arnAccounts.length === 0) {
      fetchUserArnAccounts();
    }
  }, [isCustomer, userId, arnAccounts.length, dispatch, setSelectedAccountId]);

 
  const handleAccountChange = (e) => {
    const accountId = e.target.value;
    setSelectedAccount(accountId);
    setSelectedAccountId(accountId); 

    console.log("Selected Account ID:", accountId);
  };

  return (
    <div>
      <div className="flex items-center space-x-8">

        <button onClick={() => dispatch(toggleSidebar())}>
          <IoMenu className="w-6 h-6 text-gray-700 cursor-pointer" />
        </button>

        {/* Logo */}
        <div className="shrink-0">
          <img
            src={cloudbalance}
            alt="CloudBalance"
            className="h-20 w-auto"
          />
        </div>

        {/* Dropdown only for customer */}
        {isCustomer && (
          <div className="flex flex-col text-sm">
            <h4 className="font-semibold text-gray-700 leading-none">
              Associated Accounts
            </h4>

            <div className="relative inline-block">
              {loading ? (
                <div className="text-gray-500 text-base">
                  Loading accounts...
                </div>
              ) : (
                <>
                  <select
                    className="appearance-none bg-transparent text-gray-800 focus:outline-none pr-6 text-base cursor-pointer"
                    value={selectedAccount}
                    onChange={handleAccountChange}
                  >
                    {arnAccounts.length === 0 ? (
                      <option value="">No Accounts Found</option>
                    ) : (
                      <>
                        {!selectedAccount && (
                          <option value="" disabled>
                            Select Account
                          </option>
                        )}
                        {arnAccounts.map((acc, index) => (
                          <option key={index} value={acc.accountId}>
                            {acc.name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-blue-500">
                    <RiArrowDropDownLine size={27} />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeftNavSection;

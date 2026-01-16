import { createContext, useState } from "react";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  return (
    <AccountContext.Provider
      value={{ selectedAccountId, setSelectedAccountId }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export { AccountContext };

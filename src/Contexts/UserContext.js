import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const UserContext = createContext();

function UserContextProvider({ children }) {
  let defaultUserData;
  const userDataLocal = localStorage.getItem("userData");

  if (userDataLocal) {
    defaultUserData = JSON.parse(userDataLocal);
  } else {
    defaultUserData = {
      userId: uuidv4(),
      viewedProducts: [],
      likedProducts: [],
    };
    localStorage.setItem("userData", JSON.stringify(defaultUserData));
  }

  const [userData, setUserData] = useState(defaultUserData);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
export { UserContext, UserContextProvider };

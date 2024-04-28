import React from "react";
import UserContext from "./auth/UserContext";

const demoUser = {
  id: "mockUserId",
  username: "testuser",
  firstName: "testfirst",
  lastName: "testlast",
  profImage: null,
  about: "To spain"
};

const UserProvider =
    ({ children, currentUser = demoUser }) => (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
);

export { UserProvider };

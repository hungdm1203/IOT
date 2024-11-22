import React from "react";
import { auth } from "../FirebaseConfig"; // Import Firebase auth module
import { signOut } from "firebase/auth"; // Import signOut function from Firebase

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth); // Call Firebase signOut function
      onLogout(); // Call the onLogout function passed as a prop
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <button className="Logout"
      onClick={handleLogout}
    >
      Đăng xuất
    </button>
  );
};

export default LogoutButton;

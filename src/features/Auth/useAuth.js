import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";
import RoleSelectionPopup from "../../pages/LoginPage/RoleSelectionPopUp/RoleSelectionPopup";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRolePopup, setShowRolePopup] = useState(false);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const connectionStatus = "connectionDown";
    try {
      const response = await axios.post(
        "http://fams-api.ap-northeast-1.elasticbeanstalk.com/api/v1/test/loginToFAMS",
        { username, password }
      );

      //console.log(response.data)
      if (response.status === 200 && response.data.success) {
        const { accessToken, refreshToken, roles, username } = response.data.data;
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);

        const roleArray = roles.split(",");
        const userData = { roles: roleArray };

        if (roleArray.length > 1) {
          setShowRolePopup(true);
        } else {
          setShowRolePopup(false);
          userData.selectedRole = roleArray[0];
          setUser(userData);
          sessionStorage.setItem("selectedRole", roleArray[0]);
        }

        sessionStorage.setItem("username", username);

        return userData.roles;
      }
    } catch (error) {
      //console.error("Login error:", error);
      if (error.code === 'ERR_NETWORK') { return connectionStatus; }
      return null;
    }
  };

  const selectedRole = (role) => {
    setUser((prevUser) => ({ ...prevUser, selectedRole: role }));
    sessionStorage.setItem("selectedRole", role);
    setShowRolePopup(false);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.clear();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, showRolePopup, setShowRolePopup }}>
      {showRolePopup && user && user.roles && (
        <RoleSelectionPopup onSelectRole={selectedRole} roles={user.roles} />
      )}
      {children}
    </AuthContext.Provider>
  );
};

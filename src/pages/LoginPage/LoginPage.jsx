import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/Auth/useAuth";
import "./LoginPage.css";
import RoleSelectionPopup from "./RoleSelectionPopUp/RoleSelectionPopup";
import fsaLogo from "../../assets/fsalogo.png";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import LoginLoader from "./RoleSelectionPopUp/LoginLoader/LoginLoader";
import NetworkError from "./RoleSelectionPopUp/LoginNetworkError/NetworkError";

const trainerRole = ["TRAINER"];
const adminRoles = ["CLASS_ADMIN", "FA_MANAGER"];
const deliveryManagerRoles = ["DELIVERY_MANAGER", "CHECKPOINT_REVIEWER"];
const trainerManagerRole = ["TRAINER_MANAGER"];
const FAMdminRoles = ["FAMS_ADMIN"];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [roles, setRoles] = useState([]);
  const [ShowLoaderPopup, setShowLoaderPopup] = useState(false);
  const [noConnectionPopup, setNoConnectionPopup] = useState(false);
  const [showRolePopup, setShowRolePopup] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setRoles([]);
    sessionStorage.removeItem("selectedRole");
    setShowLoaderPopup(true);
    setNoConnectionPopup(false);

    try {
      const roles = await login(username, password);
      if(roles === 'connectionDown') { setNoConnectionPopup(true);  roles = null;}
      if (roles) {
        setShowLoaderPopup(false);
        const userRoles = [];

        if (roles.some((role) => adminRoles.includes(role))) {
          userRoles.push("admin");
        }
        if (roles.some((role) => FAMdminRoles.includes(role))) {
          userRoles.push("FAMadmin");
        }
        if (roles.some((role) => trainerRole.includes(role))) {
          userRoles.push("trainer");
        }
        if (roles.some((role) => deliveryManagerRoles.includes(role))) {
          userRoles.push("deliverymanager");
        }
        if (roles.some((role) => trainerManagerRole.includes(role))) {
          userRoles.push("trainermanager");
        }

        if (userRoles.length === 1) {
          // Automatically navigate if only one role is available
          handleRoleSelection(userRoles[0]);
        } else if (userRoles.length > 1) {
          // Show popup if multiple roles are available
          setRoles(userRoles);
          setShowRolePopup(true);
        } else {
          setMessage("There are no valid roles for this account!");
        }
      } else {
        setMessage("The username or password is incorrect!");
        setUsername("");
        setPassword("");
        setShowLoaderPopup(false);
      }
    } catch (error) {
      //console.error("Login error:", error);
      setShowLoaderPopup(false);
      setMessage("An error occurred during login. Please try again.");
    }
  };

  const handleRoleSelection = (selectedRole) => {
    sessionStorage.setItem("selectedRole", selectedRole);
    setShowRolePopup(false);

    if (selectedRole === "admin") {
      navigate("/adminPage");
    } else if (selectedRole === "trainer") {
      navigate("/trainerPage");
    } else if (selectedRole === "deliverymanager") {
      navigate("/DeliveryManagerPage");
    } else if (selectedRole === "trainermanager") {
      navigate("/TrainermanagerPage");
    } else if (selectedRole === "FAMadmin") {
      navigate("/FAMAdminPage");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setPlayAnimation(true);
  }, []);

  return (
    <div className="login-container">
      <div className={`startTop ${playAnimation ? "startup-animation" : ""}`}>
        <svg id="logo-svg" xmlns="http://www.w3.org/2000/svg"
          version="1.1" viewBox="0 0 1600 383" width="2161" height="518">
          <path transform="translate(210)"
            d="m0 0h19l15 3 13 5 15 8 21 14 7 5-2 5-12 19-10 15h-3l-16-10-14-10-13-5-6-1h-8l-11 3-10 6-9 9-15 23-19 29-40 61-21 32-29 44-8 13-4 10-2 8 1 13 5 12 9 10 10 6 12 3h10l11-3 9-5 7-7 16-23 14-22 18-27 29-44 28-42 12-19 28-42 11-17 10-16 18-27 18-18 14-9 16-6 15-3h18l16 3 15 6 13 8 10 9 7 7 20 30 46 70 61 93 11 17 7 14 4 14 1 6v24l-4 17-6 13-6 10-9 11-8 7-14 9-11 5-15 4-7 1h-16l-14-2-18-6-13-8-10-9-8-8-9-12-8-9-10-7-11-5-13-3h-20l-15 4-13 7-11 9-10 13-8 10-11 10-14 8-16 6-11 2h-24l-14-3-13-5-12-7-6-7-3-7v-10l5-10 6-5 7-3h11l17 7 4 1h16l13-4 9-6 5-5 12-14 9-10 10-8 13-8 13-6 17-5 15-2h17l19 3 21 7 16 9 11 9 7 6 9 11 9 12 9 7 9 4 4 1h18l10-4 9-6 7-8 4-8 2-8v-12l-4-13-8-14-24-36-25-38-46-70-21-32-10-15-7-8-9-6-9-3-12-1-14 3-10 6-8 8-17 26-13 20-19 29-50 76-29 44-16 24-19 29-11 17-10 14-9 10-13 10-16 8-12 4-11 2h-20l-14-3-13-5-14-8-11-9-10-11-9-15-5-15-2-12v-20l3-15 6-16 6-11 26-39 50-76 13-20 11-17 29-44 9-12 11-11 14-9 11-5 14-4z"
            fill="#044F96" />
          <path transform="translate(210)"
            d="m0 0h19l15 3 13 5 15 8 21 14 7 5-2 5-12 19-10 15h-3l-16-10-14-10-13-5-6-1h-8l-11 3-10 6-9 9-15 23-19 29-40 61-21 32-29 44-8 13-4 10-2 8 1 13 5 12 9 10 10 6 12 3h10l11-3 9-5 7-7 16-23 14-22 18-27 29-44 28-42 9-14 3 4 3 5 12 14 8 9v2h5l2-1-2 5-23 35-29 44-16 24-19 29-11 17-10 14-9 10-13 10-16 8-12 4-11 2h-20l-14-3-13-5-14-8-11-9-10-11-9-15-5-15-2-12v-20l3-15 6-16 6-11 26-39 50-76 13-20 11-17 29-44 9-12 11-11 14-9 11-5 14-4z"
            fill="#6DB244" />
          <path transform="translate(517,223)"
            d="m0 0 4 4v2h2l9 11 5 3 11 13 10 11 8 10 10 11 9 11 7 8v2h4l-3 12-7 14-8 11-5 6-8 7-14 9-11 5-15 4-7 1h-16l-14-2-18-6-13-8-10-9-8-8-9-12-8-9-10-7-11-5-13-3h-20l-15 4-13 7-11 9-10 13-8 10-11 10-14 8-16 6-11 2h-24l-14-3-13-5-12-7-6-7-3-7v-10l5-10 6-5 7-3h11l17 7 4 1h16l13-4 9-6 5-5 12-14 9-10 10-8 13-8 13-6 17-5 15-2h17l19 3 21 7 16 9 11 9 7 6 9 11 9 12 9 7 9 4 4 1h18l10-4 9-6 7-8 4-8 2-8v-12l-4-13-8-14-21-31z"
            fill="#276F7F" />
          <path transform="translate(210)"
            d="m0 0h19l15 3 13 5 15 8 21 14 7 5-2 5-12 19-10 15h-3l-16-10-14-10-13-5-6-1h-8l-11 3-10 6-9 9-15 23-19 29-40 61-21 32-12 18-6 1-9-11-9-10-7-9-2-1 1-9 19-29 25-38 13-20 11-17 29-44 9-12 11-11 14-9 11-5 14-4z"
            fill="#478E63"
            stroke="none" />
          <path transform="translate(343,266)"
            d="m0 0 2 1 2 7 10 11 9 11 5 6 8 4 5 1v1l-16 1-15 4-13 7-11 9-10 13-8 10-11 10-14 8-16 6-11 2h-24l-14-3-13-5-12-7-6-7-3-7v-10l5-10 6-5 7-3h11l17 7 4 1h16l13-4 9-6 5-5 12-14 9-10 10-8 13-8 13-6z"
            fill="#488E63"
            stroke="none" />
          <path transform="translate(237,141)"
            d="m0 0m-1 2 3 4 3 5 12 14 8 9v2h5l2-1-2 5-23 35-29 44-16 24-19 29-12 18-5 2-7-7-8-10-12-13-1-7 10-15 25-38 29-44 28-42z"
            fill="#478E63"
            stroke="none" />
          <path transform="translate(335,11)"
            d="m0 0 2 4 4 1 12 14 7 8 4 5v4l4 2-11 4-9 7-8 9-10 16-17 26-19 29-24 36-4 2-4-1-9-11-10-11-4-5-2-7 4-8 26-39 11-17 10-16 18-27 18-18z"
            fill="#19628B"
            stroke="none" />
          <path transform="translate(1080,192)"
            d="m0 0h63l14 2 13 5 9 7 7 7 7 14 3 13v11l-3 14-6 12-9 10-10 7-16 5h-72zm26 22v64h37l9-2 8-6 5-6 4-13v-10l-4-13-9-10-10-4z"
            fill="#045096" />
          <path transform="translate(210)"
            d="m0 0h19l15 3 13 5 15 8 21 14 7 5-2 5-12 19-10 15h-3l-16-10-14-10-13-5-6-1h-8l-11 3-10 6-9 9-6 9-7-1-9-11-9-10-6-7-2-6 2-5 9-10 10-9 14-8 13-5z"
            fill="#286F7F"
            stroke="none" />
          <path transform="translate(726,191)"
            d="m0 0h27l11 22 13 28 18 37 9 19v2h-27l-3-5-4-8v-2h-61l-1 5-5 10h-28l2-6 18-37 11-24 8-16zm13 32-8 16-10 21v2h38l-18-38z"
            fill="#045096" />
          <path transform="translate(983,191)"
            d="m0 0h27l8 16 19 39 13 28 11 23v2h-27l-7-14h-60l-7 14h-28l9-20 18-37 13-28zm13 32-18 37v2h38l-5-12-13-27z"
            fill="#045096" />
          <path transform="translate(863,189)"
            d="m0 0h17l16 4 14 7 11 10 1 3-13 12-5 4-4-2-7-6-8-4-6-2h-15l-11 4-8 7-5 10-1 4v12l4 11 6 7 12 6 6 1h10l13-4 8-6 6-5 14 13 4 3-2 4-7 7-13 8-11 4-11 2h-13l-14-3-12-5-12-9-8-10-5-10-3-13v-15l4-15 6-10 9-10 11-7 12-5z"
            fill="#055096" />
          <path transform="translate(517,223)"
            d="m0 0 4 4v2h2l9 11 5 3 11 13 10 11 8 10 10 11 9 11 7 8v2h4l-3 12-7 14-8 11-5 6-8 7-14 9-11 5-7 2-10-9-13-15-9-10-4-5v-6h21l10-4 9-6 7-8 4-8 2-8v-12l-4-13-8-14-21-31z"
            fill="#19628B"
            stroke="none" />
          <path transform="translate(1334,192)"
            d="m0 0h25l14 24 15 26 14 24 15 26 3 5v2h-26l-15-27-14-24-5-9-1 60h-26v-106z"
            fill="#045096" />
          <path transform="translate(1240,77)"
            d="m0 0h17l5 12 11 30v3h2l3-10 13-35h11l4 8 13 35 1 2 11-31 5-13 1-1h17l-3 10-21 55-3 6h-12l-2-1-16-42-8 20-8 21-2 2h-12l-4-8-20-53-3-7z"
            fill="#075297" />
          <path transform="translate(1442,192)"
            d="m0 0h25v107h-25l-1-61-14 25-3 5h-2l-12-19 1-4 10-18 14-24 6-10z"
            fill="#044F96" />
          <path transform="translate(277,81)"
            d="m0 0 3 1 4 6 8 9 14 16 4 2-7 11-16 25-17 25-4 2-4-1-9-11-10-11-4-5-2-7 4-8 26-39z"
            fill="#286F7F"
            stroke="none" />
          <path transform="translate(1456,77)"
            d="m0 0h45l9 3 6 5 4 9v10l-5 10-7 5 2 4 10 13 7 9v1h-21l-7-9-10-14v-2h-17v25h-17v-68zm17 14-1 1v14h26l4-4v-7l-4-3-3-1z"
            fill="#0D569A" />
          <path transform="translate(1029,75)"
            d="m0 0h14l13 4 10 7 7 10 3 12v8l-2 9-6 10-9 8-12 5-6 1h-9l-12-3-9-5-6-5-6-10-2-6v-16l4-10 6-8 8-6 10-4zm2 16-10 5-5 6-2 5v10l4 8 8 6 8 2 10-1 8-5 5-6 2-10-2-8-5-7-7-4-4-1z"
            fill="#055196" />
          <path transform="translate(950,75)"
            d="m0 0h9l17 3 12 5 3 3-8 13-13-6-10-2h-10l-6 3-1 4 3 3 29 7 10 5 4 5 2 5v9l-3 6-7 6-10 4-7 1h-12l-17-3-9-4-5-3 1-5 6-9 5 2 14 5 6 1h12l6-3 1-3-4-4-28-7-10-5-5-7-1-3v-9l4-8 8-6z"
            fill="#065196" />
          <path transform="translate(211)"
            d="m0 0h18l15 3 13 5 15 8 21 14 7 5-2 5-12 19-10 15h-3l-5-3-8-10-11-12-7-8-22-26-8-9z"
            fill="#1A628B"
            stroke="none" />
          <path transform="translate(1538,77)"
            d="m0 0h61v14l-44 1-1 13h39v13l-1 1h-38v13h46v14h-63v-68z"
            fill="#045096" />
          <path transform="translate(1484,192)"
            d="m0 0h30l14 20 28 42v45h-26l-1-44-10-13-10-14-13-18-12-16z"
            fill="#055196" />
          <path transform="translate(1394,76)"
            d="m0 0h17l10 19 13 28 10 21v2h-18l-4-9h-38l-5 9h-18l8-18 17-35zm8 21-11 23v2h24l-8-18-4-7z"
            fill="#055096" />
          <path transform="translate(748,77)"
            d="m0 0h41l8 3 7 6 4 10v7l-3 9-5 6-8 4-27 1-1 23h-17v-68zm17 14-1 1v16h23l4-4v-8l-4-4-2-1z"
            fill="#055096" />
          <path transform="translate(369,261)"
            d="m0 0h14v6l12 14 9 10 9 11 11 12 9 11 10 11 9 11 14 15 3 3v2l2 1-2 1-11-6-12-11-7-7-9-12-8-9-10-7-11-5-25-6-6-4-9-11-11-12-5-6-1-7 16-4z"
            fill="#2F7778"
            stroke="none" />
          <path transform="translate(675,77)"
            d="m0 0h61l1 1v13h-45v17h38v14h-38v24h-17z"
            fill="#065196" />
          <path transform="translate(1089,77)"
            d="m0 0h61v14l-44 1-1 16h38l1 1v13l-38 1-1 23h-16z"
            fill="#044F96" />
          <path transform="translate(46,191)"
            d="m0 0m-1 2h1v6l3 1 9 11 10 11 5 6v2l5-1-2 5-18 27-4 7-4 1-5-4-9-11-11-12-5-7 2-7 11-17 10-15z"
            fill="#62A84E"
            stroke="none" />
          <path transform="translate(1216,192)"
            d="m0 0h94l1 1v21h-96v-21z"
            fill="#045096" />
          <path transform="translate(134,298)"
            d="m0 0 2 3 7 8 9 10 8 10 3 3 5-1-6 9-11 13-14 11-3 1-7-5-9-11-9-10-5-7 1-3 11-8 9-10z"
            fill="#62A84E"
            stroke="none" />
          <path transform="translate(1157,77)"
            d="m0 0h76l1 1v13h-30v55h-17v-55h-31v-13z"
            fill="#0B5498" />
          <path transform="translate(1216,278)"
            d="m0 0h95v21h-95z"
            fill="#034F96" />
          <path transform="translate(812,77)"
            d="m0 0h76l1 1v13l-30 1v54h-17v-55h-31v-13z"
            fill="#065197" />
          <path transform="translate(1215,235)"
            d="m0 0h72v22h-71l-1-1z"
            fill="#055195" />
          <path transform="translate(168,16)"
            d="m0 0 3 3 2 5 10 11 9 11 5 4 2 2-1 3-8 7-6 7-4 6-7-1-9-11-9-10-6-7-2-6 2-5 9-10z"
            fill="#2F7778"
            stroke="none" />
          <path transform="translate(253,118)"
            d="m0 0h3l6 9 9 10 9 11 5 2-1 5-14 21-4 2-4-1-9-11-10-11-4-5-2-7 4-8 11-16z"
            fill="#2F7778"
            stroke="none" />
          <path transform="translate(471,154)"
            d="m0 0 5 5 11 16 5 5 8 9 7 9 3 3 1 3 5 4 2 4 4 3 4 7 9 8 4 7 9 8 1 3 5 4 4 7 9 8v3l4 2 4 6 5 4v3l4 2 2 4 6 5 5 1 1-3-1 13-3 3-5-5-12-14-11-13-8-9-7-8-12-14-16-16v-2h-2l-5-5-27-41-18-27z"
            fill="#055195"
            stroke="none" />
          <path transform="translate(1573,192)"
            d="m0 0h27v5l-14 18-14 19-3 3-11-12-4-5 2-4 8-12 8-11z"
            fill="#055196" />
          <path transform="translate(471,154)"
            d="m0 0 5 5 11 16 5 5 8 9 7 9 3 3-1 2-3 1-7-9-3-1-14-22-11-16z"
            fill="#1C648C"
            stroke="none" />
          <path transform="translate(587,292)"
            d="m0 0 5 4 5 1 1-3-1 13-4-4-3-6-3-3z"
            fill="#19628A"
            stroke="none" />
          <path transform="translate(371,42)"
            d="m0 0 5 2 8 3v1h-14z"
            fill="#246A90"
            stroke="none" />
          <path transform="translate(345,6)"
            d="m0 0 2 1-1 6-5-1v-2l-3-1z"
            fill="#286C92"
            stroke="none" />
        </svg>
        <div className="fsa-logo">
          <img src={fsaLogo} alt="FSA Logo" />
        </div>
      </div>
      <div className={`startBot ${playAnimation ? "startup-animation" : ""}`}>
        <div className="login-box">
          <div className="login-content">
            <form onSubmit={handleLogin}>
              <div
                className={`title ${playAnimation ? "startup-animation" : ""}`}
              >
                <span>L</span> <span>o</span> <span>g</span> <span>I</span> <span>n</span> <span>|</span>
              </div>
              <div className="input-field">
                <label>Personal Email/Username</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter your email or username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <div className="passContainer">
                  <label>Password</label>
                  <input
                    className="input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {showPassword ? (
                  <EyeInvisibleOutlined
                    className="hidePass"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <EyeOutlined
                    className="showPass"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
              {message && <p className="error-message">{message}</p>}
              <div className="action">
                <button className="login-button" type="submit">
                  Log in
                </button>
                <button
                  className="login-button"
                  onClick={() => {
                    navigate("./feedback/verify-email");
                  }}
                >
                  Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {ShowLoaderPopup && (
        <LoginLoader/>
      )}
      {showRolePopup && (
        <RoleSelectionPopup onSelectRole={handleRoleSelection} roles={roles} />
      )}

      {noConnectionPopup && (
        <NetworkError/>
      )}
    </div>
  );
};

export default Login;

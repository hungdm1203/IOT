import React, { useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import FanControl from "./components/FanControl";
import PumpControl from "./components/PumpControl";
import WindowControl from "./components/WindowControl";
import FireDetection from "./components/FireDetection";
import GasThresholdAdjuster from "./components/GasThresholdAdjuster";
import DataHistory from "./components/DataHistory";
import GasStatus from "./components/GasStatus";
import SystemControl from "./components/SystemControl";
import SelectRoom from "./components/SelectRoom";
import DeviceManager from "./components/DeviceManager";
import "./styles.css";

const App = () => {
  const [user, setUser] = useState(null); // Quản lý trạng thái người dùng
  const [isRegistering, setIsRegistering] = useState(false); // Chuyển đổi giữa đăng ký và đăng nhập
  const [gasThreshold, setGasThreshold] = useState(50); // Ngưỡng khí gas mặc định

  // Xử lý đăng nhập
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    setUser(null);
  };

  // Xử lý đăng ký
  const handleRegister = (registeredUser) => {
    setUser(registeredUser);
  };

  // Chuyển đổi giữa đăng nhập và đăng ký
  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
  };

  // Thay đổi ngưỡng khí gas
  const handleThresholdChange = (newThreshold) => {
    setGasThreshold(newThreshold);
  };

  return (
    <div className="container">
      {user ? (
        <>
          {/* Header */}
          <div className="header-container">
            <h1 className="header-title">Hệ thống phát hiện rò rỉ khí ga</h1>
            <Logout onLogout={handleLogout} />
          </div>
          <div className="body-content">
            {/* <div>
              <SelectRoom />
            </div>
            <div>
              <DeviceManager />
            </div> */}
            <div className="GasFire">
              <GasStatus threshold={gasThreshold} />
              <FireDetection />
            </div>
            <div className="system">
              <GasThresholdAdjuster onThresholdChange={handleThresholdChange} />
              <SystemControl />
            </div>
            <div className="controls-container">
              <FanControl />
              <PumpControl />
              <WindowControl />
            </div>
            <DataHistory />
          </div>
        </>
      ) : (
        <>
          {isRegistering ? (
            <Register onRegister={handleRegister} />
          ) : (
            <Login onLogin={handleLogin} />
          )}
          <button onClick={toggleAuthMode}>
            {isRegistering
              ? "Đã có tài khoản? Đăng nhập"
              : "Chưa có tài khoản? Đăng ký"}
          </button>
        </>
      )}
    </div>
  );
};

export default App;

import React, { useState } from "react";
import "./DeviceManager.css";

// Import icon trực tiếp
import FanIcon from "../images/fan-icon.png";
import PumpIcon from "../images/pump-icon.png";
import WindowIcon from "../images/window-icon.png";

const DeviceManager = () => {
  const [devices, setDevices] = useState([
    { id: 1, status: "connected", icon: FanIcon },
    { id: 2, status: "disconnected", icon: PumpIcon },
    { id: 3, status: "connected", icon: WindowIcon },
  ]);

  const handleRemoveDevice = (id) => {
    setDevices(devices.filter((device) => device.id !== id));
  };

  const handleAddDevice = () => {
    const newDevice = {
      id: devices.length + 1,
      name: `Thiết bị mới ${devices.length + 1}`,
      status: "connected",
      icon: FanIcon, // Hoặc biểu tượng mặc định khác
    };
    setDevices([...devices, newDevice]);
  };

  return (
    <div className="device-manager">
      <h2>Quản lý thiết bị</h2>
      <div className="device-list">
        {devices.map((device) => (
          <div className="device-item" key={device.id}>
            <img src={device.icon} alt={device.name} className="device-icon" />
            <div className="device-info">
              <h3>{device.name}</h3>
              <p
                className={`device-status ${
                  device.status === "connected" ? "connected" : "disconnected"
                }`}
              >
                {device.status === "connected" ? "Connected" : "Disconnected"}
              </p>
            </div>
            <button
              className="remove-button"
              onClick={() => handleRemoveDevice(device.id)}
            >
              Xóa
            </button>
          </div>
        ))}

        {/* Icon Add Device */}
        <div className="add-device-section">
          <div className="add-icon">+</div>
          <button className="add-device-button" onClick={handleAddDevice}>
            Thêm thiết bị
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceManager;

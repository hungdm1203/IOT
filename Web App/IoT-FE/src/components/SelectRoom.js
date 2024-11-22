import React from "react";
import "./SelectRoom.css";
import livingRoomIcon from "../images/living-icon.png"; // Đường dẫn đến icon phòng khách
import kitchenIcon from "../images/kitchen-icon.png"; // Đường dẫn đến icon phòng bếp

const RoomSelector = () => {
  return (
    <div className="room-selector">
      <h2>Chọn Phòng</h2>
      <div className="room-buttons">
        <button className="room-button">
          <img src={livingRoomIcon} alt="Phòng khách" className="room-icon" />
          Phòng khách
        </button>
        {/* <button className="room-button">
          <img src={kitchenIcon} alt="Phòng bếp" className="room-icon" />
          Phòng bếp
        </button> */}
      </div>
    </div>
  );
};

export default RoomSelector;

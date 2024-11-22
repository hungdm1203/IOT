// src/components/WindowControl.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDatabase, ref, onValue } from "firebase/database";
import "./WindowControl.css";

const WindowControl = () => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const windowStateRef = ref(db, "data/windowState");

    // Lắng nghe thay đổi của windowState từ Firebase theo thời gian thực
    const unsubscribe = onValue(windowStateRef, (snapshot) => {
      const windowState = snapshot.val();
      setIsWindowOpen(windowState === 1);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  const toggleWindow = async () => {
    try {
      const newWindowState = !isWindowOpen ? 1 : 0; // Đảo ngược trạng thái hiện tại
      const response = await axios.post(
        "https://whldjc-3001.csb.app/api/updateWindowState",
        { windowState: newWindowState }
      );
      console.log("API Response:", response.data); // Log phản hồi từ API
    } catch (error) {
      console.error("Lỗi khi cập nhật windowState:", error.message); // Log lỗi nếu có
    }
  };

  return (
    <div className="window-control">
      <h2>Trạng thái cửa sổ: {isWindowOpen ? "MỞ" : "ĐÓNG"}</h2>
      <div className={`window-icon ${isWindowOpen ? "open" : "closed"}`}></div>
      <button onClick={toggleWindow}>{isWindowOpen ? "Đóng" : "Mở"}</button>
    </div>
  );
};

export default WindowControl;

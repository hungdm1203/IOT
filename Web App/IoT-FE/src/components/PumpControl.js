// src/components/PumpControl.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDatabase, ref, onValue } from "firebase/database";
import "./PumpControl.css";

const PumpControl = () => {
  const [isPumpOn, setIsPumpOn] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const pumpStateRef = ref(db, "data/pumpState");

    // Lắng nghe thay đổi của pumpState từ Firebase theo thời gian thực
    const unsubscribe = onValue(pumpStateRef, (snapshot) => {
      const pumpState = snapshot.val();
      setIsPumpOn(pumpState === 1);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  const togglePump = async () => {
    try {
      const newPumpState = !isPumpOn ? 1 : 0; // Đảo ngược trạng thái hiện tại
      const response = await axios.post(
        "https://whldjc-3001.csb.app/api/updatePumpState",
        { pumpState: newPumpState }
      );
      console.log("API Response:", response.data); // Log phản hồi từ API
    } catch (error) {
      console.error("Lỗi khi cập nhật pumpState:", error.message); // Log lỗi nếu có
    }
  };

  return (
    <div className="pump-control">
      <h2>Trạng thái máy bơm: {isPumpOn ? "BẬT" : "TẮT"}</h2>
      <div className={`pump-icon ${isPumpOn ? "ON" : "OFF"}`}></div>
      <button onClick={togglePump}>{isPumpOn ? "Tắt" : "Bật"}</button>
    </div>
  );
};

export default PumpControl;

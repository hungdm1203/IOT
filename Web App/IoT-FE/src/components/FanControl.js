// src/components/FanControl.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getDatabase, ref, onValue } from "firebase/database";
import "./FanControl.css";

const FanControl = () => {
  const [isFanOn, setIsFanOn] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const fanStateRef = ref(db, "data/fanState");

    // Lắng nghe thay đổi của fanState từ Firebase theo thời gian thực
    const unsubscribe = onValue(fanStateRef, (snapshot) => {
      const fanState = snapshot.val();
      setIsFanOn(fanState === 1);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  const toggleFan = async () => {
    try {
      const newFanState = !isFanOn ? 1 : 0; // Đảo ngược trạng thái hiện tại
      const response = await axios.post(
        "https://whldjc-3001.csb.app/api/updateFanState",
        { fanState: newFanState }
      );
      console.log("API Response:", response.data); // Log phản hồi từ API
    } catch (error) {
      console.error("Lỗi khi cập nhật fanState:", error.message); // Log lỗi nếu có
    }
  };

  return (
    <div className="fan-control">
      <h2>Trạng thái quạt: {isFanOn ? "BẬT" : "TẮT"}</h2>
      <div className={`fan-icon ${isFanOn ? "spinning" : ""}`}></div>
      <button onClick={toggleFan}>{isFanOn ? "Tắt" : "Bật"}</button>
    </div>
  );
};

export default FanControl;

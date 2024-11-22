// src/components/SystemControl.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getDatabase, ref, onValue } from "firebase/database";
import "./SystemControl.css"; // Tạo file CSS nếu cần

const SystemControl = () => {
  const [isManual, setIsManual] = useState(false); // Trạng thái systemState

  useEffect(() => {
    const db = getDatabase();
    const systemStateRef = ref(db, "data/systemState");

    // Lắng nghe thay đổi của systemState từ Firebase theo thời gian thực
    const unsubscribe = onValue(systemStateRef, (snapshot) => {
      const systemState = snapshot.val();
      setIsManual(systemState === 1);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  const toggleSystemState = async () => {
    try {
      const newSystemState = !isManual ? 1 : 0; // Đảo ngược trạng thái hiện tại
      const response = await axios.post(
        "https://whldjc-3001.csb.app/api/updateSystemState", // Thay URL này bằng endpoint API của bạn
        { systemState: newSystemState }
      );
      console.log("API Response:", response.data); // Log phản hồi từ API
    } catch (error) {
      console.error("Lỗi khi cập nhật systemState:", error.message); // Log lỗi nếu có
    }
  };

  return (
    <div className="system-control">
      <h2>Trạng thái hệ thống: {isManual ? "Điều chỉnh" : "Tự động"}</h2>
      {/* <div className={`system-icon ${isManual ? "manual" : "auto"}`}></div> */}
      <button onClick={toggleSystemState}>
        {isManual ? "Tự động" : "Điều chỉnh"}
      </button>
    </div>
  );
};

export default SystemControl;

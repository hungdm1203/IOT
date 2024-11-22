// src/components/GasStatus.js
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";


const GasStatus = () => {
  const [gasValue, setGasValue] = useState(null);
  const [gasThreshold, setGasThreshold] = useState(100); // Giá trị mặc định cho gasThreshold
  const [status, setStatus] = useState("safe");

  useEffect(() => {
    const db = getDatabase();
    const gasValueRef = ref(db, "data/gasValue");
    const gasThresholdRef = ref(db, "data/gasThreshold");

    // Lấy giá trị gasValue theo thời gian thực
    const unsubscribeGasValue = onValue(gasValueRef, (snapshot) => {
      const value = snapshot.val();
      setGasValue(value);

      // Cập nhật trạng thái dựa trên điều kiện
      if (value >= gasThreshold) {
        setStatus("danger");
      } else if (value < gasThreshold - 100) {
        setStatus("safe");
      } else {
        setStatus("warning");
      }
    });

    // Lấy giá trị gasThreshold theo thời gian thực
    const unsubscribeGasThreshold = onValue(gasThresholdRef, (snapshot) => {
      const threshold = snapshot.val();
      setGasThreshold(threshold);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => {
      unsubscribeGasValue();
      unsubscribeGasThreshold();
    };
  }, [gasThreshold]);

  return (
    <div className="card">
      <h2 className="label">Mức khí gas hiện tại: {gasValue} ppm</h2>
      <div className="sublabel">
        Trạng thái hệ thống:{" "}
        <span className={`status-${status.toLowerCase()}`}>{status}</span>
      </div>
    </div>
  );
};

export default GasStatus;

// src/components/FireDetection.js
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import fireIcon from "../images/fire-icon.png";

const FireDetection = () => {
  const [isFireDetected, setIsFireDetected] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const fireStateRef = ref(db, "data/fireState");

    // Lắng nghe thay đổi của fireState từ Firebase theo thời gian thực
    const unsubscribe = onValue(fireStateRef, (snapshot) => {
      const fireState = snapshot.val();
      setIsFireDetected(fireState === 0); // fireState = 0 là có lửa
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="fire-detection-container">
      <h2>Phát hiện lửa</h2>
      <div className={`status ${isFireDetected ? "fire" : "no-fire"}`}>
        {isFireDetected ? (
          <>
            <img src={fireIcon} alt="Fire Icon" style={styles.icon} />
            <span>Có lửa</span>
          </>
        ) : (
          <span>An toàn</span>
        )}
      </div>
    </div>
  );
};

const styles = {
  icon: {
    width: "24px",
    height: "24px",
    marginRight: "8px",
  },
};

export default FireDetection;

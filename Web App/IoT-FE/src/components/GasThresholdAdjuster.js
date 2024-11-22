import React, { useState } from "react";
import axios from "axios";

const GasThresholdAdjuster = ({ onThresholdChange }) => {
  const [threshold, setThreshold] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      setThreshold(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (threshold) {
      try {
        await axios.post("https://whldjc-3001.csb.app/api/updateGasThreshold", {
          gasThreshold: Number(threshold),
        });
        onThresholdChange(Number(threshold)); // Gửi giá trị mới cho component cha (nếu cần)
        alert("Cập nhật ngưỡng khí gas thành công");
      } catch (error) {
        console.error("Lỗi khi cập nhật ngưỡng khí gas:", error);
        alert("Lỗi khi cập nhật ngưỡng khí gas");
      }
    }
  };

  return (
    <div className="threshold-adjuster-container">
      <h2>Điều chỉnh ngưỡng khí gas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={threshold}
          onChange={handleInputChange}
          placeholder="Nhập ngưỡng khí gas (ppm)"
          min="0"
        />
        <button className="buttonAdjust" type="submit">
          Cập nhật ngưỡng
        </button>
      </form>
    </div>
  );
};

export default GasThresholdAdjuster;

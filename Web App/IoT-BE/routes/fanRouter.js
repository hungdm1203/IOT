const express = require("express");
const { getDatabase, ref, set, onValue } = require("firebase/database");
const router = express.Router();

// Route POST để cập nhật fanState vào Firebase
router.post("/updateFanState", async (req, res) => {
  const { fanState } = req.body;
  const db = getDatabase();

  try {
    await set(ref(db, "data/fanState"), fanState); // Cập nhật fanState trên Firebase
    res.status(200).send({ message: "Cập nhật fanState thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật fanState:", error);
    res.status(500).send({ message: "Lỗi khi cập nhật fanState" });
  }
});

// Route GET để nhận dữ liệu fanState theo thời gian thực
router.get("/realtimeFanState", (req, res) => {
  const db = getDatabase();
  const fanStateRef = ref(db, "data/fanState");

  // Lắng nghe sự thay đổi của fanState
  onValue(
    fanStateRef,
    (snapshot) => {
      const fanState = snapshot.val();
      res.status(200).json({ fanState });
    },
    (error) => {
      console.error("Lỗi khi lắng nghe fanState:", error);
      res.status(500).send({ message: "Lỗi khi lắng nghe fanState" });
    }
  );
});

module.exports = router;

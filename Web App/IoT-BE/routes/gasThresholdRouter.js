
const express = require("express");
const { getDatabase, ref, set } = require("firebase/database");
const router = express.Router();

router.post("/updateGasThreshold", async (req, res) => {
  const { gasThreshold } = req.body;
  const db = getDatabase();

  try {
    await set(ref(db, "data/gasThreshold"), gasThreshold); // Cập nhật gasThreshold trên Firebase
    res.status(200).send({ message: "Cập nhật gasThreshold thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật gasThreshold:", error);
    res.status(500).send({ message: "Lỗi khi cập nhật gasThreshold" });
  }
});

module.exports = router;

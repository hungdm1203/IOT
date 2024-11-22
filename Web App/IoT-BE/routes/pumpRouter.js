const express = require("express");
const { getDatabase, ref, set } = require("firebase/database");
const db = require("../firebaseConfig");
const router = express.Router();

router.post("/updatePumpState", async (req, res) => {
  const { pumpState } = req.body;
  const db = getDatabase();

  try {
    await set(ref(db, "data/pumpState"), pumpState); // Cập nhật pumpState trên Firebase
    res.status(200).send({ message: "Cập nhật pumpState thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật pumpState:", error);
    res.status(500).send({ message: "Lỗi khi cập nhật pumpState" });
  }
});

module.exports = router;

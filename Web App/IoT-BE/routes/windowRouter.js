const express = require("express");
const { getDatabase, ref, set } = require("firebase/database");
const db = require("../firebaseConfig");
const router = express.Router();

router.post("/updateWindowState", async (req, res) => {
  const { windowState } = req.body;
  const db = getDatabase();

  try {
    await set(ref(db, "data/windowState"), windowState); // Cập nhật windowState trên Firebase
    res.status(200).send({ message: "Cập nhật windowState thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật fanState:", error);
    res.status(500).send({ message: "Lỗi khi cập nhật windowState" });
  }
});

module.exports = router;

const express = require("express");
const { getDatabase, ref, set } = require("firebase/database");
const db = require("../firebaseConfig"); // Đường dẫn tới file cấu hình Firebase
const router = express.Router();

router.post("/updateSystemState", async (req, res) => {
  const { systemState } = req.body; // Lấy giá trị systemState từ request body
  const db = getDatabase();

  try {
    await set(ref(db, "data/systemState"), systemState); // Cập nhật systemState trên Firebase
    res.status(200).send({ message: "Cập nhật systemState thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật systemState:", error);
    res.status(500).send({ message: "Lỗi khi cập nhật systemState" });
  }
});

module.exports = router;

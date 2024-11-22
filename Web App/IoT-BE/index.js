const express = require("express");
const admin = require("firebase-admin");
const app = express();
const cors = require("cors");
const fanRouter = require("./routes/fanRouter");
const windowRouter = require("./routes/windowRouter");
const pumpRouter = require("./routes/pumpRouter");
const systemState = require("./routes/systemRouter");
const gasThresholdRouter = require("./routes/gasThresholdRouter");

app.use(cors());
app.use(express.json());

app.use("/api", fanRouter);
app.use("/api", windowRouter);
app.use("/api", pumpRouter);
app.use("/api", systemState);
app.use("/api", gasThresholdRouter);

// Khởi tạo Firebase Admin SDK
const serviceAccount = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://fir-demo-e6b12-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.database();

// Tạo API endpoint để lấy dữ liệu từ Firebase
app.get("/api/data", async (req, res) => {
  try {
    const snapshot = await db.ref("data").once("value");
    const data = snapshot.val();
    res.json(data);
  } catch (error) {
    res.status(500).send("Error retrieving data: " + error.message);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

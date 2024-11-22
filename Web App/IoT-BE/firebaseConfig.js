const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyBAtvixephRkjFGAbX_c_nOoSNiE77436M",
  authDomain: "fir-demo-e6b12.firebaseapp.com",
  databaseURL:
    "https://fir-demo-e6b12-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-demo-e6b12",
  storageBucket: "fir-demo-e6b12.firebasestorage.app",
  messagingSenderId: "59181756680",
  appId: "1:59181756680:web:bae93b743a4c8bfff3fcbd",
};

// Khởi tạo ứng dụng Firebase
const app = initializeApp(firebaseConfig);

// Xuất cơ sở dữ liệu để sử dụng trong các file khác
const db = getDatabase(app);
module.exports = db;

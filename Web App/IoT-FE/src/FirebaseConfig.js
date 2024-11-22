import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };

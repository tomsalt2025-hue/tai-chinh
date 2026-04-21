import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADjNI0XAdOqxD6-EIxhFHr9mlPnZxHC2w",
  authDomain: "taichinhtest.firebaseapp.com",
  projectId: "taichinhtest",
  storageBucket: "taichinhtest.firebasestorage.app",
  messagingSenderId: "224584615305",
  appId: "1:224584615305:web:e23c0a722676c2f4f60d58",
  measurementId: "G-C5GBPZ6MFP"
};

// Khởi tạo các dịch vụ chính của Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Cấu hình cơ sở dữ liệu thời gian thực Firestore
export const db = getFirestore(app);

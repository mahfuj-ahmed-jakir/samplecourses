// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCC5u9uUjek-TWHIgCRp24xNgu3o2Wkn8g",
  authDomain: "node-mongo-one.firebaseapp.com",
  projectId: "node-mongo-one",
  storageBucket: "node-mongo-one.appspot.com",
  messagingSenderId: "952056713346",
  appId: "1:952056713346:web:10fc52fb2f777e05af649b",
  measurementId: "G-NRSBDTWB8F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;

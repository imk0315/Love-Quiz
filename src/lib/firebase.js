import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDPNzlN9Lq1wXSXvpvKeQhBN1QZs1nDu8E",
  authDomain: "love-quiz-fd802.firebaseapp.com",
  databaseURL: "https://love-quiz-fd802-default-rtdb.asia-
  southeast1.firebasedatabase.app",
  projectId: "love-quiz-fd802",
  storageBucket: "love-quiz-fd802.appspot.com",
  messagingSenderId: "163599587575",
  appId: "1:163599587575:web:dd9e7b78b9639690299bf2",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
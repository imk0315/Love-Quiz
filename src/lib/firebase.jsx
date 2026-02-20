import { initializeApp } from "firebase/app"

import { getDatabase } from "firebase/database"

const firebaseConfig = {

  apiKey: "AIzaSyDPNzlN9******KeQhBN1QZs1nDu8E",

  authDomain: "love-quiz-fd802.****aseapp.com",

  databaseURL: "https://love-qui***802-default-rtdb.asia-
  southeast1.firebasedatabase.app",

  projectId: "love-quiz-fd802",

  storageBucket: "love-quiz-fd802.appspot.com",

  messagingSenderId: "163***587575",

  appId: "1:163599587575:web:dd9e7b78b9639690299bf2",

}

const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)

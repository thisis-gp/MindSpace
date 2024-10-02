import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD9M-l4omGOdDNHDGzWDfq1G7WjbEOHiGs",
  authDomain: "mindspace-5af03.firebaseapp.com",
  projectId: "mindspace-5af03",
  storageBucket: "mindspace-5af03.appspot.com",
  messagingSenderId: "1058961337777",
  appId: "1:1058961337777:web:cdde5d2eff42a3fdf12190",
  measurementId: "G-PE8DYQEX7S",
  databaseURL: "https://mindspace-5af03-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };

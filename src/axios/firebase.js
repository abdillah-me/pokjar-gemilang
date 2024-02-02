// Import hanya fungsi yang Anda butuhkan
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Konfigurasi Firebase Anda
const firebaseConfig = {
    apiKey: "AIzaSyCBmWeArUtxaBRQaYL88OpGKwaL_0EgrtY",
    authDomain: "pokjar-9ff33.firebaseapp.com",
    projectId: "pokjar-9ff33",
    storageBucket: "pokjar-9ff33.appspot.com",
    messagingSenderId: "549660388056",
    appId: "1:549660388056:web:520937479bd1e023e405ad",
};

// Inisialisasi Firebase
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp(); // Jika sudah diinisialisasi, gunakan instance yang ada
}

// Inisialisasi layanan Firebase
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

import { initializeApp, getApps, getApp, FirebaseApp, setLogLevel } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDtwN1fJFvflhqsnz25Ux65o3tyODDlEFI",
  authDomain: "dindersiatolyesi.firebaseapp.com",
  projectId: "dindersiatolyesi",
  storageBucket: "dindersiatolyesi.firebasestorage.app",
  messagingSenderId: "384271892451",
  appId: "1:384271892451:web:94d82a40c0c0b447e9aad6"
};

let app: FirebaseApp;

// Singleton pattern: Uygulamanın sadece bir kez başlatılmasını sağlar
if (!getApps().length) {
    try {
        app = initializeApp(firebaseConfig);
        setLogLevel('error');
    } catch (error) {
        console.error("Firebase initialization error", error);
        app = getApp();
    }
} else {
    app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Offline persistence (Sadece tarayıcıda çalışır)
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db)
    .catch((err) => {
      if (err.code == 'failed-precondition') {
        console.warn("Firestore persistence failed (multiple tabs open).");
      } else if (err.code == 'unimplemented') {
        console.warn("Firestore persistence not supported.");
      }
    });
}

// Storage'ı da dışarı aktarıyoruz
export { app, auth, db, storage };

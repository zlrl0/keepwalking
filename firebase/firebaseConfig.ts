// firebase/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 🔐 Firebase 콘솔에서 발급받은 config 객체
const firebaseConfig = {
  apiKey: "AIzaSyAyj0FDIJTQ-7XrO7rMk1mtr1DWXZOHxyw",
  authDomain: "keepwalking-a4728.firebaseapp.com",
  projectId: "keepwalking-a4728",
  storageBucket: "keepwalking-a4728.appspot.com", // ← 🔧 수정됨 (.app → .com)
  messagingSenderId: "639797374211",
  appId: "1:639797374211:web:4aea8d7266b9166ac00d36",
  measurementId: "G-CGYQ30KHG9",
};

// ⚙️ Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// 🔐 인증, 🔥 데이터베이스 인스턴스 생성
const auth = getAuth(app);
const db = getFirestore(app);

// 📤 다른 곳에서 쓸 수 있도록 export
export { auth, db };



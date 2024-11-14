import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDSk5mau_md-8q57JNvB-CFa2rfYZA1fJM",
    authDomain: "wanpipti-e6b4f.firebaseapp.com",
    projectId: "wanpipti-e6b4f",
    storageBucket: "wanpipti-e6b4f.appspot.com",
    messagingSenderId: "391800686912",
    appId: "1:391800686912:web:14b7ac2a83d15a957912a5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
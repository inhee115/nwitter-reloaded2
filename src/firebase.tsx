import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDqjhmyXQM6qEbe-klrzuudZGX3PQbTxAM",
    authDomain: "nwitter-reloaded-4f582.firebaseapp.com",
    projectId: "nwitter-reloaded-4f582",
    storageBucket: "nwitter-reloaded-4f582.appspot.com",
    messagingSenderId: "324132837233",
    appId: "1:324132837233:web:806bf1c96567457dc008d0"
};

const app = initializeApp(firebaseConfig);

// 인증 서비스에 대한 링크 받아서 사용
export const auth = getAuth(app);
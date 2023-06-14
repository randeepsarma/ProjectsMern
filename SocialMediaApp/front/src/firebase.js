// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBo_798PLrIvH_L61wJLim5EI0cBpSpUo",
  authDomain: "socialmediaapp-6bd87.firebaseapp.com",
  projectId: "socialmediaapp-6bd87",
  storageBucket: "socialmediaapp-6bd87.appspot.com",
  messagingSenderId: "523693611229",
  appId: "1:523693611229:web:18babd1fb860f238f6e334",
  measurementId: "G-NV6SSXNWW6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const storage = getStorage(app)

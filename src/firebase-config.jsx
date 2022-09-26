// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyAprXFrP-EV3YsuiqVJizRFWzwDih9Mgvw",
  authDomain: "rodadanegocios-d21fc.firebaseapp.com",
  databaseURL: "https://rodadanegocios-d21fc-default-rtdb.firebaseio.com",
  projectId: "rodadanegocios-d21fc",
  storageBucket: "rodadanegocios-d21fc.appspot.com",
  messagingSenderId: "68384024514",
  appId: "1:68384024514:web:706b8c6073ff701b30d85b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
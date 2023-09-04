// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "tinder-89f77.firebaseapp.com",
  databaseURL: "https://tinder-89f77-default-rtdb.firebaseio.com",
  projectId: "tinder-89f77",
  storageBucket: "tinder-89f77.appspot.com",
  messagingSenderId: "108034160231",
  appId: "1:108034160231:web:333312987d9bfee50306c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signIn = async() =>{
  try{
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    console.log('Firebase', res);
    return res;

  }
  catch(e){
    console.log(e);
  }


}
export const signOut= ()=>{
  signOut(auth).then(() => {
    console.log('Signout successful');
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}
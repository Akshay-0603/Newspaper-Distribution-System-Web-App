// import * as firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { toast } from 'react-toastify';
import 'firebase/compat/storage';

import 'react-toastify/dist/ReactToastify.css';
toast.configure(); 
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyAyzYgeQ1fn6RHoqSHmELZCWi74n3x9awY",
//   authDomain: "fir-for-mp.firebaseapp.com",
//   projectId: "fir-for-mp",
//   storageBucket: "fir-for-mp.appspot.com",
//   messagingSenderId: "906275210200",
//   appId: "1:906275210200:web:01d2905ad8ed837a3e68ad",
//   measurementId: "G-WVBYLW6MVM"
// });


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCFP7fTFXRlxViYrrrnLYpILlAmKgwT-gk",
    authDomain: "wce-mp4.firebaseapp.com",
    projectId: "wce-mp4",
    storageBucket: "wce-mp4.appspot.com",
    messagingSenderId: "583488455512",
    appId: "1:583488455512:web:7292ba0a3f61cda37ddb2d",
    measurementId: "G-8ZBWJBC7TM"
  });
 
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export { db, auth, storage,firebaseApp };
export function getCurrenuser() {
  // return firebase.auth().currentUser
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        resolve(user);
      } else {
        resolve(null);
      }
      unsubscribe();
    })
  })

}

export function logoutUser() {
  return firebase.auth().signOut();
}

export async function loginUser(username, password) {
  // const email = `${username}@newspa.com`;
  const email = username;
  try {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log(res);
    return res;    
  } catch (error) {
    console.log(error);
    // presentToast(error.message);
    toast(error.message);
    return false;
  }
}

export async function registerUser(username, password) {
  // const email = `${username}@newspa.com`;
  const email = username;
  try {
    const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error.message);
    toast(error.message);
    // presentToast(error.message);
    console.log(error);
    return false;
  }
}




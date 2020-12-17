import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB-HZVE6MhNv78nY_fLFSvbXPE0GPbj0Oc",
  authDomain: "precificacao-63b50.firebaseapp.com",
  databaseURL: "https://precificacao-63b50-default-rtdb.firebaseio.com",
  projectId: "precificacao-63b50",
  storageBucket: "precificacao-63b50.appspot.com",
  messagingSenderId: "497562181858",
  appId: "1:497562181858:web:df1279eafe3af08584febb",
  measurementId: "G-5TCMV2MRY6" 
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig); 
// let fireDb = firebase.database().ref('/precificacao');

export default firebase;
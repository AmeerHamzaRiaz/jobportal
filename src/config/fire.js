import firebase from "firebase";

var config = {
  apiKey: "AIzaSyB0inGEd6XX5VFBSzuU-dNeAL_sI2YH27M",
  authDomain: "bootcamp-proj0.firebaseapp.com",
  databaseURL: "https://bootcamp-proj0.firebaseio.com",
  projectId: "bootcamp-proj0",
  storageBucket: "bootcamp-proj0.appspot.com",
  messagingSenderId: "553932503316"
};
const fire = firebase.initializeApp(config);
export default fire;

import firebase from "firebase";

var config = {
  apiKey: "xxxxxxxxxxxxxxxxx-xxxxx_xxxxxxxx",
  authDomain: "xxxxxxxxxxxx.firebaseapp.com",
  databaseURL: "https://xxxxxxxxxxx.firebaseio.com",
  projectId: "xxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxx.appspot.com",
  messagingSenderId: "xxxxxxxxxxxxxx"
};
const fire = firebase.initializeApp(config);
export default fire;

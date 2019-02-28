import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyDHsSZ_BpRi1VSjODWhmDOm-7rQps-WR78",
  authDomain: "smooffee.firebaseapp.com",
  databaseURL: "https://smooffee.firebaseio.com",
  projectId: "smooffee",
  storageBucket: "smooffee.appspot.com",
  messagingSenderId: "492601336928"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;

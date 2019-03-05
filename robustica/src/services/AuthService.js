import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBqHXy9cnVIfxuEQ1rO-V2eiZNC873xenY',
  authDomain: 'smooffee-test.firebaseapp.com',
  databaseURL: 'https://smooffee-test.firebaseio.com',
  projectId: 'smooffee-test',
  storageBucket: 'smooffee-test.appspot.com',
  messagingSenderId: '286867392347'
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;

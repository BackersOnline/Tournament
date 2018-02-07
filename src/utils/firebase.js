import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyACKvmgVwrxbGvq0qN2_3Wd3hOU4icHoZE",
  authDomain: "backers-games.firebaseapp.com",
  databaseURL: "https://backers-games.firebaseio.com",
  projectId: "backers-games",
  storageBucket: "backers-games.appspot.com",
  messagingSenderId: "393222091819"
};

firebase.initializeApp(config);
const auth = firebase.auth();

export {
  firebase,
  auth
};
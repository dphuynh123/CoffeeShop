import * as firebase from 'firebase';
var firebaseConfigDA = {
    apiKey: "AIzaSyDpiy9QOFGi-qyD3Ov_mS6hg6l5xZ0t6W8",
    authDomain: "db-dath.firebaseapp.com",
    databaseURL: "https://db-dath.firebaseio.com",
    projectId: "db-dath",
    storageBucket: "db-dath.appspot.com",
    messagingSenderId: "922658097904",
    appId: "1:922658097904:web:357d9a84c0d3fac9"
  };
  
export  const firebaseAppDA = firebase.initializeApp(firebaseConfigDA);
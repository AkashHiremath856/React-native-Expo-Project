import  firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
 //Your firebase sdk setup and config 
 //https://firebase.google.com/docs/web/setup
};

let app;

if(firebase.apps.length===0){
  app=firebase.initializeApp(firebaseConfig)
}else{
  app=firebase.app();
}

const db=app.firestore();
const auth=firebase.auth();

export{db,auth};

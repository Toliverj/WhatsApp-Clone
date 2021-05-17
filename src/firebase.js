import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA3eWGv8Jq4mpQD1fCp3Kr1BmQWmV0zUxQ",
    authDomain: "instagram-clone-react-edecf.firebaseapp.com",
    projectId: "instagram-clone-react-edecf",
    storageBucket: "instagram-clone-react-edecf.appspot.com",
    messagingSenderId: "1051126422866",
    appId: "1:1051126422866:web:f602961ee4964a6a71ae8b",
    measurementId: "G-V1X5FG392F"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore()

  const auth = firebase.auth()

  const provider = new firebase.auth.GoogleAuthProvider()

  export {auth, provider}
  export default db
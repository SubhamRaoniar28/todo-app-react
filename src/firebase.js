import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({

        apiKey: "AIzaSyA2uBoYCcg31wRzZhIlJllboACFU0XfMME",
        authDomain: "todo-app-react-5b265.firebaseapp.com",
        projectId: "todo-app-react-5b265",
        storageBucket: "todo-app-react-5b265.appspot.com",
        messagingSenderId: "445878857006",
        appId: "1:445878857006:web:ade2b42645d8d60690debf",
        measurementId: "G-JHMPVPNHWP"

});

const db = firebaseApp.firestore();

export default db;
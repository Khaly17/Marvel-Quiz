import app from 'firebase/compat/app'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCPUFWwO-tH_5S5iJ4YfvEqj9aenH_QNoU",
    authDomain: "marvel-quiz-2ec2a.firebaseapp.com",
    projectId: "marvel-quiz-2ec2a",
    storageBucket: "marvel-quiz-2ec2a.appspot.com",
    messagingSenderId: "1024982783058",
    appId: "1:1024982783058:web:a041d9a8ea38600eb2fb8b"
};

class Firebase{
    constructor() {
        app.initializeApp(config)
        this.auth = app.auth()
    }

    //Inscription
    signupUser = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password)

    //Connexion
    loginUser = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password)

    //Deconnexion
    signoutUser = () =>
        this.auth.signOut()
}

export default Firebase
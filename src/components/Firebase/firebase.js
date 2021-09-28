import app from 'firebase/compat/app'

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
    }
}

export default Firebase
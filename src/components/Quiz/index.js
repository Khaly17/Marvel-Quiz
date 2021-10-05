import React, {Component} from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { QuizMarvel} from "../quizMarvel";
import Levels from "../Levels";
import ProgressBar from "../Progressbar";
import QuizOver from "../QuizOver";

toast.configure()

class Quiz extends Component{

    state ={
        levelName: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question:null,
        options:[],
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0,
        showWelcomeMsg: false,
        quizEnd: false
    }

    storedDataRef = React.createRef()

    loadQuestions = quizz => {

        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz]

        if(fetchedArrayQuiz.length >= this.state.maxQuestions){

            this.storedDataRef.current = fetchedArrayQuiz

            const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest)

            this.setState({
                storedQuestions: newArray
            })

        }else {

        }
    }

    showWelcomeMsg = pseudo => {
        if(!this.state.showWelcomeMsg){

            this.setState({
                showWelcomeMsg: true
            })

            toast.warn(`Bienvenue ${pseudo}, et bonne change!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    }

    componentDidMount() {
        this.loadQuestions(this.state.levelName[this.state.quizLevel])
    }

    nextQuestion = ()  => {
        if(this.state.idQuestion === this.state.maxQuestions-1){
            this.gameOver()
        }else {
            this.setState(prevState =>( {
                idQuestion: prevState.idQuestion + 1
            }))
        }

        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer

        if(this.state.userAnswer === goodAnswer){
            this.setState(prevState =>({
                score: prevState.score +1
            }))

            toast.success('Bravo +1', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else{
            toast.error('Raté 0', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.storedQuestions !== prevState.storedQuestions) {

            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }

        if(this.state.idQuestion !== prevState.idQuestion){
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true
            })
        }

        if(this.props.userData.pseudo){
           this.showWelcomeMsg(this.props.userData.pseudo)
        }
    }

    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    gameOver = () => {
        this.setState({
            quizEnd: true
        })
    }

    render() {


       const displayOptions = this.state.options.map((option, index) => {
            return(
                <p key={ index }
                   className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}

                   onClick={() => this.submitAnswer(option)}
                >
                    { option }


                </p>
            )
        })
        return(
            !this.state.quizEnd ? (
                <QuizOver
                    ref={this.storedDataRef}
                />
            )
                :

                (

                    <>

                        <Levels/>

                        <ProgressBar
                            idQuestion = {this.state.idQuestion}
                            maxQuestion = {this.state.maxQuestions}
                            bar = {this.state.score * 10}
                        />
                        <h2>{this.state.question}</h2>

                        { displayOptions }

                        <button
                            disabled={this.state.btnDisabled}
                            className="btnSubmit"
                            onClick={this.nextQuestion}
                        >
                            {this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant" : "Terminer"}
                        </button>

                    </>
            )
        )


   }
}

export default Quiz
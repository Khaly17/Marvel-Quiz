import React, {useEffect, useState} from "react";


const QuizOver = React.forwardRef(
    (props, ref) => {

        const {
            levelName,
            score,
            maxQuestions,
            quizLevel,
            percent,
            loadLevelQuestions,
        } = props

        const [asked, setAsked] = useState([])
        useEffect(()=>{
            setAsked(ref.current)
        },[ref])

        const averageGrade = maxQuestions / 2

        if(score < averageGrade){
            setTimeout(()=>loadLevelQuestions(quizLevel),3000)
        }

        const decision = score >= averageGrade ? (
            <>
                <div className="stepsBtnContainer">
                {
                    quizLevel < levelName.length ?
                        (
                            <>

                                <p className="successMsg">Bravo, passez au niveau suivant!</p>
                                <button
                                    className="btnResult success"
                                    onClick={()=>loadLevelQuestions(quizLevel)}
                                >
                                    Niveau Suivant
                                </button>

                            </>
                        )
                        :
                        (
                             <>
                                 <p className="successMsg">Bravo, vous etes un expert!</p>
                                 <button
                                     className="btnResult gameOver"
                                     onClick={()=>loadLevelQuestions(0)}
                                 >
                                    Accueil
                                 </button>

                             </>
                        )
                }
                </div>
                <div className="percentage">
                    <div className="progressPercent">reussite: {percent}%</div>
                    <div className="progressPercent">Note: {score}/{maxQuestions}</div>
                </div>
            </>

        )
            :
            (
                <>
                    <div className="percentage">
                        <p className="failureMsg">Vous avez échoué</p>
                    </div>
                    <div className="percentage">
                        <div className="progressPercent">réussite: {percent}%</div>
                        <div className="progressPercent">Note: {score}/{maxQuestions}</div>
                    </div>
                </>
            )

        const questionAnswer = score >= averageGrade ? (
                asked.map(question => {
                    return(
                        <tr key={question.id}>
                            <td>{question.question}</td>
                            <td>{question.answer}</td>
                            <td>
                                <button className="btnInfo">Infos</button>
                            </td>
                        </tr>
                    )
                })
        )
            :
            (
                <tr>
                    <td colSpan="3">
                        <div className="loader"></div>
                        <p style={{textAlign: 'center', color: 'red', }}>
                            Pas de réponse!
                        </p>
                    </td>
                </tr>
            )


        return(
           <>
               {decision}

                   <hr/>
                   <p>Les reponsés aux questions posées</p>

                   <div className="answerContainer">
                       <table className="answers">
                           <thead>
                                <tr>
                                    <th>Questions</th>
                                    <th>Réponses</th>
                                    <th>Infos</th>
                                </tr>
                           </thead>
                           <tbody>
                                { questionAnswer }
                           </tbody>
                       </table>
                   </div>

           </>
        )
    }
)


export default React.memo(QuizOver)

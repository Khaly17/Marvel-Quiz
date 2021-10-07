import React, {useEffect, useState} from "react";
import {GiTrophyCup} from "react-icons/gi";
import {HiBadgeCheck} from "react-icons/hi";
import Loader from "../Loader";
import Modal from "../Modal";


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
        const [openModal, setOpenModal] = useState(false)

        useEffect(()=>{
            setAsked(ref.current)
        },[ref])

        const showModal = id => { setOpenModal(true)}

        const hideModal = ()=>{setOpenModal(false)}

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

                                <p className="successMsg">
                                    <HiBadgeCheck size='50px'/>
                                    Bravo, passez au niveau suivant!
                                </p>
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
                                 <p className="successMsg">
                                     <GiTrophyCup size='50px'/>
                                     Bravo, vous etes un expert!
                                 </p>
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
                    <div className="progressPercent">réussite: {percent}%</div>
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
                                <button
                                    className="btnInfo"
                                    onClick={()=>showModal(question.heroId)}
                                >
                                    Infos
                                </button>
                            </td>
                        </tr>
                    )
                })
        )
            :
            (
                <tr>
                    <td colSpan="3">
                     <Loader
                         loadingMsg={'Pas de Réponse'}
                         styling={{textAlign: 'center', color: 'red'}}
                     />
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

               <Modal
                   showModal={openModal}
                   hideModal={hideModal}
               >
                    <div className="modalHeader">
                        <h2>Titre</h2>
                    </div>
                   <div className="modalBody">
                        <h3>Titre 2</h3>
                   </div>
                   <div className="modalFooter">
                        <button className="modalBtn">Fermer</button>
                   </div>
               </Modal>

           </>
        )
    }
)


export default React.memo(QuizOver)

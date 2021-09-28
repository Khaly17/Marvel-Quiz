import React, {useRef, useEffect, useState} from "react";

const Landing = () => {

    const [btn, setBtn] = useState(false)

    console.log(btn)

    const refwolverine = useRef(null)

    useEffect(()=>{
        refwolverine.current.classList.add("startingImg")
        setTimeout(()=>{
            refwolverine.current.classList.remove("startingImg")
            setBtn(true)
        }, 1000)
    },[])

    const setLeftImg = () => {
        refwolverine.current.classList.add("leftImg")

    }

    const setRigthImg = () => {
        refwolverine.current.classList.add("rightImg")
    }

    const clearImg = () => {
        if(refwolverine.current.classList.contains("leftImg")){
            refwolverine.current.classList.remove("leftImg")
        }
        else  if(refwolverine.current.classList.contains("rightImg")){
            refwolverine.current.classList.remove("rightImg")
        }
    }

    const displayBtn = btn && (
        <>
            <div onMouseOver={setLeftImg} onMouseOut={clearImg} className="leftBox">
                <button className="btn-welcome">Inscription</button>
            </div>
            <div onMouseOver={setRigthImg} onMouseOut={clearImg} className="rightBox">
                <button className="btn-welcome">Connexion</button>
            </div>
        </>
    )

    return(
       <main ref={refwolverine} className="welcomePage">
           { displayBtn }
       </main>
    )
}

export default Landing
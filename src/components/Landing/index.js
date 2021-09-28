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

    const displayBtn = btn && (
        <>
            <div className="leftBox">
                <button className="btn-welcome">Inscription</button>
            </div>
            <div className="rightBox">
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
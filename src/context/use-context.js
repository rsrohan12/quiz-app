import React, { useState } from 'react'


const IsClickedContext = React.createContext(
    {
        changeContent: false,
        onClick: () => { },
        continue: false,
        isFormSubmit: false,
        formHandler: () => {},
        showResult: false
    }
);



export const ClickedContext = (props) => {

    const [isClicked, setIsClicked] = useState(false);
    const [isContinue, setIsContinue] = useState(false);
    const [formSubmit, setFormSubmit] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const clickHandler = (val) => {
        if (val === 'Continue') {
            setIsClicked(true);
        }
        else if (val === 'Start Quiz') {
            setIsContinue(true);
        }
        else if (val === 'Quit Quiz'){
            setIsClicked(false);
            setShowResult(false);
            setFormSubmit(false);
        }
        else if (val === 'Result'){
            setShowResult(true);
        }
        else if(val === 'Replay Quiz'){
            setFormSubmit(false);
            setShowResult(false);
        }

        else {
            setIsContinue(false);
        }
    }

    const submitFormHandler = (val) => {
        setFormSubmit(true);
    }

    return (
        <IsClickedContext.Provider value={{
            changeContent: isClicked,
            onClick: clickHandler,
            continue: isContinue,
            formHandler: submitFormHandler,
            isFormSubmit: formSubmit,
            showResult: showResult
        }}>
            {props.children}
        </IsClickedContext.Provider>
    )
};

export default IsClickedContext;
import { decode } from 'html-entities';
import React, { useContext, useEffect, useState } from 'react'
import IsClickedContext from '../../context/use-context';
import useFetch from '../hooks/useFetch';
import Result from '../result/Result';

import './QuestionBox.css';


const QuestionBox = (props) => {

    const [allQuestions, setAllQuestions] = useState([]);
    const [counter, setCounter] = useState(0);
    const [correctCounter, setCorrectCounter] = useState(0);
    const [show, setShow] = useState(true);
    const [statusBar, setStatusBar] = useState('');
    const ctx = useContext(IsClickedContext);

    const { isLoading, getData, isError } = useFetch();



    useEffect(() => {

        const getQuestions = (data) => {
            setAllQuestions(data);
        }

        getData(props.value.inputCategory, props.value.inputAmount, props.value.inputDifficulty, getQuestions);
    }, [getData]);
    // console.log(allQuestions);
    // console.log(isLoading);


    useEffect(() => {
        const timer = setInterval(() => {

            if (show && !isLoading && !isError) {
                setCounter(prevState => {
                    return prevState + 1;
                });
            }

        }, 15000);
        if (counter + 1 === +props.value.inputAmount) {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [show, isLoading, counter, isError]);


    // render options
    let options;
    if (!isLoading && !isError) {
        options = allQuestions[counter].incorrect_answers;
        if (show) {
            let randomNumber = Math.floor(Math.random() * (options.length + 1));
            options.splice(randomNumber, 0, allQuestions[counter].correct_answer);
        }
    }


    useEffect(() => {
        if (!isLoading && !isError) {
            let loader = document.querySelector('.loader');
            let allOptions = document.querySelectorAll('.options');
            function marker() {
                allOptions.forEach(op => {
                    if (op.innerText === allQuestions[counter].correct_answer && !op.classList.contains('correct') && !op.classList.contains('wrong')) {
                        op.classList.add('correct');
                        op.classList.remove('hoverEffect');
                    }
                });
            }

            allOptions.forEach(opt => {
                opt.addEventListener('click', () => {

                    // let statusClass = opt.innerText === allQuestions[counter].correct_answer ? 'correct' : 'wrong'; 
                    // opt.classList.add(statusClass);
                    opt.classList.remove('hoverEffect');

                    if (opt.innerText === allQuestions[counter].correct_answer) {
                        opt.classList.add('correct');
                        opt.classList.remove('wrong');
                        setCorrectCounter(prevState => {
                            return prevState + 1;
                        });

                        // if (!document.querySelector('.reactions').innerHTML && barrier === 0) {
                        //     const img = document.createElement('img');
                        //     img.src = require('../../assests/win.gif');
                        //     img.classList.add('emojis')
                        //     document.querySelector('.reactions').appendChild(img);
                        //     barrier = 1;
                        // }
                        // if(!document.querySelector('.emojis').classList.contains('winner')){
                        //     document.querySelector('.winner').classList.remove('hidden');
                        // }
                    }

                    else {
                        opt.classList.add('wrong');
                        opt.classList.remove('correct');
                        marker();
                    }

                    setStatusBar(opt.innerText === allQuestions[counter].correct_answer ? 'win' : 'lose');
                        
                    // allOptions.forEach(op => {
                    //     if (op.innerText === allQuestions[counter].correct_answer && !op.classList.contains('wrong')) {
                    //         console.log(op)
                    //         console.log(allQuestions[counter].correct_answer);
                    //         op.classList.add('correct');
                    //         op.classList.remove('hoverEffect');
                    //     }
                    // });


                    if (loader) {
                        // loader.style.animationPlayState = 'paused';
                        loader.style.animation = 'none';
                    }

                    setShow(false);
                });
            });
        }
    });


    const buttonHandler = (e) => {

        if (e.target.innerText === 'Result') {
            ctx.onClick(e.target.innerText);
        }
        else {
            document.querySelector('.loader').style.animation = 'loading 15s linear infinite';

            let allOptions = document.querySelectorAll('.options');
            allOptions.forEach(opt => {
                if (opt.classList.contains('correct') || opt.classList.contains('wrong')) {
                    opt.classList.remove('correct');
                    opt.classList.remove('wrong');
                }
                opt.classList.add('hoverEffect');
            })
            setShow(true);
            setCounter(counter + 1);
        }
        setStatusBar('');
    }


    return (
        <>
            {isLoading && !ctx.showResult && <div><img className='loading' src={require('../../assests/loader.gif')} alt="loading..." /></div>}
            {isError && <div className="error">
                <h2>Something Went Wrong(404)</h2>
                <p>Refresh the page 🔃</p>
            </div> }
            {!isLoading && !ctx.showResult && !isError && <div className="welcome-message"><h1>Hello {props.value.inputName}, Welcome to Quizer</h1></div>}
            {!isLoading && !ctx.showResult && !isError && <div className='ques-box'>
                <div className="status">
                    <h2>Qui<span>zer</span></h2>
                    <div className="timer">
                        <h4>Time</h4>
                        <span>15s</span>
                    </div>
                </div>
                <div className="loading-timer">
                    <span className='loader'></span>
                </div>
                <div className="questions">
                    <h2><span>{counter + 1}.</span>{decode(allQuestions[counter].question)}</h2>
                    {options.map(opt => {
                        return <button key={opt} className='options hoverEffect'>{decode(opt)}</button>
                    })}
                </div>
                <hr />
                <div className="counter">
                    <p><span>{counter + 1}</span> of <span className='total-ques'>{props.value.inputAmount}</span> Questions</p>
                    {!show && <button onClick={buttonHandler}>{counter + 1 < +props.value.inputAmount ? 'Next Ques' : 'Result'}</button>}
                </div>
            </div>}
            {ctx.showResult && <Result correctCounter={correctCounter} totalQuestions={props.value.inputAmount}></Result>}
            <div className="reactions">
                {statusBar && <img className='emojis' src={require(`../../assests/${statusBar}.gif`)} alt="win" />}
            </div>
        </>
    )
};

export default QuestionBox;
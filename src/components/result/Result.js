import React from 'react'
import Button from '../UI/Button';

import { GiChessQueen } from 'react-icons/gi';

import './Result.css';

const Result = (props) => {
    return (
        <div className='result-page'>
            <GiChessQueen className='icon'/>
            <h2>You've completed the quiz <br /> and nice😎, You got <span>{props.correctCounter}</span> out of <span>{props.totalQuestions}</span></h2>
            <div className="action-btns">
                <Button className='button'>Replay Quiz</Button>
                <Button className='button'>Quit Quiz</Button>
            </div>
        </div>
    )
}

export default Result; 
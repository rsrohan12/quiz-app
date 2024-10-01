import React, { useContext } from 'react';
import IsClickedContext from '../../context/use-context';
import Button from '../UI/Button';

import './Rules.css';

const Rules = props => {

    const ctx = useContext(IsClickedContext);

    return(
        <>
        {!ctx.continue && <Button className="start-btn">Start Quiz</Button> }
        {ctx.continue && <div className='rules-box'>
            <h2>Some Rules Of This Quiz</h2>
            <hr />
            <ol className='ol'>
                <li>You will have only <span className='color-text'>15 seconds</span> per each questions.</li>
                <li>Once you select your answer. It can't be undone.</li>
                <li>You can't select any option once time goes off.</li>
                <li>You can't exit from the quiz while you're playing.</li>
                <li>you will get points on the basis of your correct answers.</li>
            </ol>
            <hr />
            <div className="exit_continue--btns">
                <Button className='btns'>Exit Quiz</Button>
                <Button className='btns'>Continue</Button>
            </div>
        </div>}
        </>
    )
};

export default Rules;
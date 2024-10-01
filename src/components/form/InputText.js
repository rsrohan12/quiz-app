import React from 'react'

import './InputText.css';

const InputText = props => {
    return (
        <div className={`${props.className} text-area`}>
            <label htmlFor="name">{props.name}</label>
            <input type={props.type} max='15' required placeholder={props.name === 'Your Name' ? 'enter your name' : 'enter the amount'}/>
        </div>
    )
};

export default InputText;
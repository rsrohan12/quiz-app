import React, { useContext } from 'react'
import IsClickedContext from '../../context/use-context';

import './Button.css';

const Button = props => {

    const ctx = useContext(IsClickedContext);
    const clickHandler = () => {
        ctx.onClick(props.children);
    }

    return (
        <button onClick={clickHandler} className={`${props.className} btn`} type={ props.type ? props.type : ''}>
            {props.children}
        </button>
    )
};

export default Button;
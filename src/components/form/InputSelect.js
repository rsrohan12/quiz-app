import React from 'react'

import './InputSelect.css';

const InputSelect = props => {

    const options = props.options.map(opt => <option key={opt.id} id={opt.id} value={opt.name}>{opt.name}</option> );

    return (
        <div className={`${props.className} select-area`}>
            <label htmlFor={props.name}>{props.name}</label>

            <select  name={props.name} id={props.name} required >
                <option value="">Select</option>
                {options}
            </select>
        </div>
    )
};

export default InputSelect;
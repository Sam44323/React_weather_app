import React from 'react';

import './InputFields.css';

const InputFields = (props) => {
  return (
    <React.Fragment>
      <label htmlFor={props.name} className='labelClass'>
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        className={props.class}
        value={props.value}
        onChange={(event) => props.changeInput(props.name, event.target.value)}
        autoComplete='off'
      />
    </React.Fragment>
  );
};

export default InputFields;

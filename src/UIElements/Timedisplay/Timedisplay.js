import React from 'react';
import './Timedisplay.css';

let timeColor = '';
let greetColor = '';
const TimeDisplay = (props) => {
  if (props.greetings === 'Good Morning') {
    timeColor = '#C44D2B';
    greetColor = '#A95739';
  } else if (props.greetings === 'Good Evening') {
    timeColor = '#5B234D';
    greetColor = '#844058';
  } else {
    timeColor = '#605077';
    greetColor = '#CF6454';
  }
  return (
    <React.Fragment>
      <div className='time_content'></div>
      <div className='timeDisplay-container'>
        <h1 className='timeDisplay' style={{ color: timeColor }}>
          {props.hours < 10 ? <span>0{props.hours}</span> : props.hours}:{' '}
          {props.minutes < 10 ? <span>0{props.minutes}</span> : props.minutes}:{' '}
          {props.seconds <= 9 ? <span>0{props.seconds}</span> : props.seconds}{' '}
          {props.time}
        </h1>
      </div>
      <h3 className='greetings_value' style={{ color: greetColor }}>
        {props.greetings}
      </h3>
    </React.Fragment>
  );
};

export default TimeDisplay;

import React from 'react';

import './WeatherDataComp.css';

const WeatherDataComp = (props) => {
  const tempUnit = props.unit === 'metric' ? 'C' : 'F';
  const imageUrl = `http://openweathermap.org/img/wn/${props.weather.icon}@2x.png`;
  return props.hasData ? (
    <React.Fragment>
      <div className='dataDiv tempMainData'>
        <h1 className='sectionTitle'>Tempertaure</h1>
        <div className='tempSubSection'>
          <h3 className='subDetails1'>
            Today: {props.mainData.temp} {tempUnit}
          </h3>
          <h4 className='subDetails2'>
            Max: {props.mainData.temp_max} {tempUnit}
          </h4>
          <h4 className='subDetails2'>
            Min: {props.mainData.temp_min} {tempUnit}
          </h4>
          <h3 className='subDetails3'>
            Pressure: {props.mainData.pressure} mb
          </h3>
          <h3 className='subDetails4'>Humidity: {props.mainData.humidity}%</h3>
        </div>
      </div>
      <div className='dataDiv weatherCondData'>
        <h1 className='sectionTitle'>Weather</h1>
        <div className='tempSubSection'>
          <h3 className='subDetails1'>Condition: {props.weather.main}</h3>
          <h4 className='subDetails2' style={{ display: 'block' }}>
            Details: {props.weather.main}
          </h4>
          <h3 className='subDetails3'>
            <img src={imageUrl} alt={props.weather.main} />
          </h3>
        </div>
      </div>
      <div className='dataDiv windCondData'>
        <h1 className='sectionTitle'>Wind</h1>
        <div className='tempSubSection'>
          <h3 className='subDetails1' style={{ padding: '30px' }}>
            Speed: {props.windData.speed} km/h
          </h3>
          <h3 className='subDetails3'>
            Wind Blow Direction: {props.windData.deg} degrees
          </h3>
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

export default WeatherDataComp;

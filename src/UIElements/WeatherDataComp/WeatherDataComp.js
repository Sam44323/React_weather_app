import './WeatherDataComp.css';

const WeatherDataComp = (props) => {
  return (
    <div className='weatherDiv'>
      <h3>{props.weather.id}</h3>
      <h3>{props.mainData.temp}</h3>
      <h3>{props.windData.speed}</h3>
    </div>
  );
};

export default WeatherDataComp;

import './Show.css';

const Show = (props) => {
  return (
    <button className='showWeatherBtn' onClick={props.fetchWeather}>
      {props.text}
    </button>
  );
};

export default Show;

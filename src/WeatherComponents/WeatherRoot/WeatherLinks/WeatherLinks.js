import WeatherLink from './WeatherLink/WeatherLink';

import './WeatherLinks.css';

const WeatherLinks = (props) => {
  return (
    <div className='weatherLinksContainer'>
      <WeatherLink
        title='Weather'
        greetings={props.condition}
        link='/weather/showWeather'
      />
      <WeatherLink
        title='History Weather'
        greetings={props.condition}
        link='/weather/historyData'
      />
      <WeatherLink
        title='Air Condition'
        greetings={props.condition}
        link='/aircondition'
      />
    </div>
  );
};

export default WeatherLinks;

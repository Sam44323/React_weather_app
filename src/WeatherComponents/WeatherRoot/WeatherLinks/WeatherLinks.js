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
        title='UV Index'
        greetings={props.condition}
        link='/weather/uvindex'
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

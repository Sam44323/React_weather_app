import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
//RENDERING COMPONENTS FOR APP
import WeatherHome from './WeatherComponents/WeatherRoot/WeatherRoot';
import ShowWeather from './WeatherComponents/ShowWeather/ShowWeather';
import UVIndex from './WeatherComponents/UVIndex/UVIndex';
import AirCondition from './WeatherComponents/AirCondition/AirCondition';

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path='/' component={WeatherHome} exact />
        <Route path='/weather/showWeather' component={ShowWeather} />
        <Route path='/weather/uvindex' component={UVIndex} />
        <Route path='/aircondition' component={AirCondition} />
      </Switch>
    </React.Fragment>
  );
};

export default App;

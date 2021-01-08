import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './ShowWeather.css';
import InputFields from '../../UIElements/InputFields/InputFields';
import LocationButton from '../../UIElements/Buttons/LocationButton/LocationButton';
import ShowWeatherButton from '../../UIElements/Buttons/Show/Show';
import Dropdown from '../../UIElements/DropDown/DropDown';
import WeatherDataComp from '../../UIElements/WeatherDataComp/WeatherDataComp';

class ShowWeather extends Component {
  state = {
    cityName: '',
    lat: 0,
    long: 0,
    unit: 'metric',
    loading: false,
    locationText: 'Get Location',
    weatherText: 'Show Weather',
    weatherData: {
      weather: {
        id: 721,
        main: 'Haze',
        description: 'haze',
        icon: '50n',
      },
      main: {
        temp: 75.6,
        feels_like: 78.24,
        temp_min: 73.4,
        temp_max: 78.01,
        pressure: 1012,
        humidity: 68,
      },
      wind: {
        speed: 4.14,
        deg: 27,
      },
    },
  };

  //method for changing the input values

  changeInputValue = (inputName, value) => {
    let changedState = { ...this.state };
    changedState[inputName] = value;
    this.setState({ ...changedState });
  };

  //method for getting the location of the user

  getLocationMethod = () => {
    this.setState({ locationText: 'Fetching' });
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
            locationText: 'Get Location',
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        });
      } else {
        alert(
          "Your browser doesn't support geolocation api. Either use a more advanced browser or enter your details manually"
        );
        this.setState({
          locationText: 'Get Location',
        });
      }
    }, 1000);
  };

  //method for getting the weather data from the user data

  fetchWeather = () => {};

  render() {
    return (
      <React.Fragment>
        <div className='userData'>
          <NavLink to='/' className='goBack'>
            Back
          </NavLink>
          <section className='userSection'>
            <h3 className='userDataTitle'>My Weather</h3>
            <div className='inputFields'>
              <div className='cityField'>
                <InputFields
                  value={this.state.cityName}
                  class='cityClass'
                  label='City Name'
                  name='cityName'
                  type='text'
                  changeInput={this.changeInputValue}
                />
              </div>
              <div className='coordField'>
                <InputFields
                  value={this.state.lat}
                  class='latLng'
                  label='Latitude'
                  name='lat'
                  type='number'
                  changeInput={this.changeInputValue}
                />
                <InputFields
                  value={this.state.long}
                  class='latLng'
                  label='Longitude'
                  name='long'
                  type='number'
                  changeInput={this.changeInputValue}
                />
              </div>
            </div>
            <div className='locationButton'>
              <LocationButton
                text={this.state.locationText}
                getLocation={this.getLocationMethod}
              />
            </div>
            <div className='showWeatherButton'>
              <ShowWeatherButton
                text={this.state.weatherText}
                fetchWeather={this.fetchWeather}
              />
            </div>
            <div className='unitsDropDown'>
              <Dropdown
                changeUnits={(event) =>
                  this.changeInputValue('unit', event.target.value)
                }
              />
            </div>
          </section>
          <br />
          <section className='weatherData'>
            <WeatherDataComp
              unit={this.state.unit}
              weather={this.state.weatherData.weather}
              mainData={this.state.weatherData.main}
              windData={this.state.weatherData.wind}
            />
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default ShowWeather;

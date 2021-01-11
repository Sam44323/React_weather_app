import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './ShowWeather.css';
import '../../UIElements/Shared/styles.css';
import APIKEY from '../../UIElements/Shared/apiId';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import InputFields from '../../UIElements/InputFields/InputFields';
import LocationButton from '../../UIElements/Buttons/LocationButton/LocationButton';
import ShowWeatherButton from '../../UIElements/Buttons/Show/Show';
import Dropdown from '../../UIElements/DropDown/DropDown';
import WeatherDataComp from '../../UIElements/WeatherDataComp/WeatherDataComp';
import axios from '../../axios-instance/customAxios';

class ShowWeather extends Component {
  state = {
    cityName: '',
    lat: 0,
    long: 0,
    unit: 'metric',
    loading: false,
    locationText: 'Get Location',
    weatherText: 'Show Weather',
    hasData: false,
    weatherData: {
      weather: {},
      main: {},
      wind: {},
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
          "Your browser doesn't support geolocation api. Either use a more advanced browser or enter your details manually!"
        );
        this.setState({
          locationText: 'Get Location',
        });
      }
    }, 1000);
  };

  //method for getting the weather data from the user data

  fetchWeather = () => {
    if (
      this.state.cityName === '' &&
      this.state.lat === 0 &&
      this.state.long === 0
    ) {
      alert('Enter some details for fetching data!');
      return;
    }
    this.setState({ loading: true });
    axios
      .get(
        `/weather?q=${this.state.cityName}&lat=${this.state.lat}&lon=${this.state.long}&units=${this.state.unit}&appid=${APIKEY}`
      )
      .then((response) => {
        const weatherData = {
          weather: { ...response.data.weather[0] },
          main: { ...response.data.main },
          wind: { ...response.data.wind },
        };
        this.setState({
          loading: false,
          hasData: true,
          weatherData: weatherData,
          cityName: '',
          lat: 0,
          long: 0,
        });
      })
      .catch((err) => {
        console.log(err);
        alert('Please try again');
        this.setState({ loading: false });
      });
  };

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
          <section className='weatherDataSection'>
            {!this.state.hasData ? (
              <h1 style={{ fontSize: '1.9rem' }}>Nothing to show!</h1>
            ) : null}
            {this.state.loading ? (
              <Loader type='Bars' color='white' height={80} width={80} />
            ) : (
              <div className='weatherData'>
                <WeatherDataComp
                  unit={this.state.unit}
                  hasData={this.state.hasData}
                  weather={this.state.weatherData.weather}
                  mainData={this.state.weatherData.main}
                  windData={this.state.weatherData.wind}
                />
              </div>
            )}
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default ShowWeather;

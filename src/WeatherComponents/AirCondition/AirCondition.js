import React from 'react';
import { NavLink } from 'react-router-dom';

import './AirCondition.css';
import '../../UIElements/Shared/styles.css';

import InputFields from '../../UIElements/InputFields/InputFields';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import LocationButton from '../../UIElements/Buttons/LocationButton/LocationButton';
import ShowWeatherButton from '../../UIElements/Buttons/Show/Show';
import APIKEY from '../../UIElements/Shared/apiId';
import axios from '../../axios-instance/customAxios';

class AirCondition extends React.Component {
  state = {
    lat: 0,
    long: 0,
    loading: false,
    locationText: 'Get Location',
    weatherText: 'Show Condition',
    hasData: false,
    airData: {},
  };

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

  fetchWeather = () => {
    if (this.state.lat === 0 && this.state.long === 0) {
      alert('Enter some details for fetching data!');
      return;
    }
    this.setState({ loading: true });
    axios
      .get(
        `/air_pollution?lat=${this.state.lat}&lon=${this.state.long}&appid=${APIKEY}`
      )
      .then((response) => {
        const airData = {
          components: { ...response.data.list[0].components },
          aqi: { ...response.data.list[0].main },
        };
        this.setState({ loading: false, airData: airData, hasData: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let output = null;
    let increaseSize = null;
    if (this.state.hasData) {
      increaseSize = 'incHeight';
      output = (
        <div className='outputDataDivision airDataDivision'>
          <h1 className='titleClass'>Air Pollutant Content</h1>
          <div className='dataValue airInnerDivision'>
            <h1 className='uvValueHeader'>
              Air Quality Index: {this.state.airData.aqi.aqi}
            </h1>
            <div>
              <h1 className='airComponentHeader'>
                Carbon Monxide: {this.state.airData.components.co.toFixed(2)}{' '}
                ppm
              </h1>
              <h1 className='airComponentHeader'>
                Nitric Oxide: {this.state.airData.components.no.toFixed(2)} ppm
              </h1>
              <h1 className='airComponentHeader'>
                Nitrogen Dioxide: {this.state.airData.components.no2.toFixed(2)}{' '}
                ppm
              </h1>
              <h1 className='airComponentHeader'>
                Ozone: {this.state.airData.components.o3.toFixed(2)} ppm
              </h1>
              <h1 className='airComponentHeader'>
                Sulphur Dioxide: {this.state.airData.components.so2.toFixed(2)}{' '}
                ppm
              </h1>
              <h1 className='airComponentHeader'>
                PM2.5: {this.state.airData.components.pm2_5.toFixed(2)} ppm
              </h1>
              <h1 className='airComponentHeader'>
                PM10: {this.state.airData.components.pm10.toFixed(2)} ppm
              </h1>
              <h1 className='airComponentHeader'>
                Azane: {this.state.airData.components.nh3.toFixed(2)} ppm
              </h1>
            </div>
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className={`airData ${increaseSize}`}>
          <NavLink to='/' className='goBack'>
            Back
          </NavLink>
          <section className='userSection'>
            <h3 className='userDataTitle'>Air Condition</h3>
            <div className='inputFields'>
              <div className='coordField sharedIndexDivision'>
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
          </section>
          <br />
          <section className='dataSection'>
            {!this.state.hasData ? (
              <h1 style={{ fontSize: '1.9rem' }}>Nothing to show!</h1>
            ) : null}
            {this.state.loading ? (
              <Loader type='Bars' color='white' height={80} width={80} />
            ) : (
              output
            )}
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default AirCondition;

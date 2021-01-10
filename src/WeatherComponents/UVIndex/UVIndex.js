import React from 'react';

import { NavLink } from 'react-router-dom';

import './UVIndex.css';
import '../../UIElements/Shared/styles.css';

import InputFields from '../../UIElements/InputFields/InputFields';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import LocationButton from '../../UIElements/Buttons/LocationButton/LocationButton';
import ShowWeatherButton from '../../UIElements/Buttons/Show/Show';
import axios from 'axios';
import { openUV } from '../../UIElements/Shared/apiId';

class UVIndex extends React.Component {
  state = {
    lat: 0,
    long: 0,
    loading: false,
    locationText: 'Get Location',
    weatherText: 'Show UV',
    hasData: false,
    uvData: {},
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
    this.setState({ loading: true, hasData: true });
    axios({
      method: 'GET',
      url: 'https://api.openuv.io/api/v1/uv',
      params: {
        lat: `${this.state.lat}`,
        lng: `${this.state.long}`,
        dt: new Date(),
      },
      headers: {
        'content-type': 'application/json',
        'x-access-token': openUV,
      },
    })
      .then((response) => {
        const uv = {
          ozone: response.data.result.ozone,
          uv_max: response.data.result.uv_max,
        };
        this.setState({ loading: false, uvData: uv });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false, hasData: false });
      });
  };

  getClassValue = (value) => {
    if (value >= 0 && value < 3) {
      return 'lowValue';
    } else if (value >= 3 && value < 6) {
      return 'modValue';
    } else if (value >= 6 && value < 8) {
      return 'highValue';
    } else if (value >= 8 && value < 11) {
      return 'veryHighValue';
    } else if (value >= 11) {
      return 'extremeValue';
    }
  };

  render() {
    let uvData = null;
    if (this.state.uvData.ozone) {
      const classValue = this.getClassValue(this.state.uvData.uv_max);
      uvData = (
        <div className='uvDataDivision'>
          <h1 className='titleClass'>UV Index - Ozone Value</h1>
          <div className='dataValue'>
            <h1 className={`uvValueHeader ${classValue}`}>
              UV Value Max: {this.state.uvData.uv_max}
            </h1>
            <h1 className='uvValueHeader ozoneValue'>
              Ozone Value: {this.state.uvData.ozone}du
            </h1>
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className='uvData'>
          <NavLink to='/' className='goBack'>
            Back
          </NavLink>
          <section className='userSection'>
            <h3 className='userDataTitle'>UV Index</h3>
            <div className='inputFields'>
              <div className='coordField uvIndex'>
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
              uvData
            )}
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default UVIndex;

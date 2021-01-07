import React, { Component } from 'react';

import './ShowWeather.css';
import InputFields from '../../UIElements/InputFields/InputFields';
import { NavLink } from 'react-router-dom';

class ShowWeather extends Component {
  state = {
    cityName: '',
    lat: 0,
    long: 0,
  };

  changeInputValue = (inputName, value) => {
    let changedState = { ...this.state };
    changedState[inputName] = value;
    this.setState({ ...changedState });
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
          </section>
        </div>
        <section className='weatherData'>
          <h3 className='locationTitle'>Entered Location by the user</h3>
        </section>
      </React.Fragment>
    );
  }
}

export default ShowWeather;

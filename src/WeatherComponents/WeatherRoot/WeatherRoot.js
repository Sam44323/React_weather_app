import React from 'react';

import './WeatherRoot.css';
import Picture from '../../UIElements/PictureElement/PictureElement';
import TimeComponent from '../../UIElements/Timedisplay/Timedisplay';
import WeatherLinks from './WeatherLinks/WeatherLinks';

class WeatherRoot extends React.Component {
  state = {
    date: {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      seconds: new Date().getSeconds(),
    },
    greetings: {
      timing: new Date().getHours() < 12 ? 'AM' : 'PM',
      greet:
        new Date().getHours() < 12
          ? 'Good Morning'
          : new Date().getHours() >= 12 && new Date().getHours() < 16
          ? 'Good Afternoon'
          : 'Good Evening',
    },
  };

  componentDidMount() {
    this.tick = setInterval(() => this.getCurrentTime(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.tick);
  }

  getCurrentTime = () => {
    const timeData = new Date();
    const greetings = this.getGreetings(timeData.getHours());
    this.setState({
      date: {
        hours: timeData.getHours(),
        minutes: timeData.getMinutes(),
        seconds: timeData.getSeconds(),
      },
      greetings: { ...greetings },
    });
  };

  getGreetings = (time) => {
    let greetObj;
    if (time < 12) {
      greetObj = {
        greet: 'Good Morning',
        timing: 'AM',
      };
    } else if (time >= 12 && time <= 16) {
      greetObj = {
        greet: 'Good Afternoon',
        timing: 'PM',
      };
    } else if (time > 16 && time < 24) {
      greetObj = {
        greet: 'Good Evening',
        timing: 'PM',
      };
    }
    return greetObj;
  };

  render() {
    return (
      <React.Fragment>
        <Picture date={this.state.date.hours}>
          <TimeComponent
            hours={this.state.date.hours}
            minutes={this.state.date.minutes}
            seconds={this.state.date.seconds}
            time={this.state.greetings.timing}
            greetings={this.state.greetings.greet}
          />
          <WeatherLinks condition={this.state.greetings.greet} />
        </Picture>
      </React.Fragment>
    );
  }
}

export default WeatherRoot;

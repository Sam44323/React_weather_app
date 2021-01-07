import { NavLink } from 'react-router-dom';

import './WeatherLink.css';

const WeatherLink = (props) => {
  const greetClass =
    props.greetings === 'Good Morning'
      ? { greet: 'morning', linkClass: 'morningLink', desc: 'morn' }
      : props.greetings === 'Good Afternoon'
      ? { greet: 'afternoon', linkClass: 'afternoonLink', desc: 'aftern' }
      : { greet: 'evening', linkClass: 'eveningLink', desc: 'even' };
  return (
    <div className={`weatherLink ${greetClass.greet}`}>
      <section className='weatherPageInfo'>
        <h1 className={`linkDescription ${greetClass.desc}`}>{props.title}</h1>
      </section>
      <NavLink to={props.link} className={greetClass.linkClass}>
        Show
      </NavLink>
    </div>
  );
};

export default WeatherLink;

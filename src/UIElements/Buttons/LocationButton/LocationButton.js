import './LocationButton.css';

const LocationButton = (props) => {
  return (
    <button className='locationBtn' onClick={props.getLocation}>
      {props.text}
    </button>
  );
};

export default LocationButton;

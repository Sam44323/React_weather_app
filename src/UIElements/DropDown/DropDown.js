import './DropDown.css';

const DropDown = (props) => {
  return (
    <div className='dropD'>
      <label htmlFor='units' className='unitsLabel'>
        Units
      </label>
      <select
        name='units'
        id='units'
        className='unitsSection'
        onChange={props.changeUnits}
      >
        <option value='metric' className='unitsOptions'>
          Metric
        </option>
        <option value='imperial' className='unitsOptions'>
          Imperial
        </option>
      </select>
    </div>
  );
};

export default DropDown;

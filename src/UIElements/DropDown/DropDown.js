import './DropDown.css';

const DropDown = (props) => {
  let dropDown = (
    <div className='dropD'>
      <label htmlFor='units' className='dropDLabel'>
        Units
      </label>
      <select
        name='units'
        id='units'
        className='dropDSection'
        onChange={props.changeUnits}
      >
        <option value='metric' className='dropDOptions'>
          Metric
        </option>
        <option value='imperial' className='dropDOptions'>
          Imperial
        </option>
      </select>
    </div>
  );
  if (props.types === 'dates') {
    dropDown = (
      <div className='dropD'>
        <label htmlFor='dates' className='dropDLabel'>
          Dates
        </label>
        <select
          name='dates'
          id='dates'
          className='dropDSection'
          onChange={props.changeUnits}
        >
          <option value='1' className='dropDOptions'>
            1
          </option>
          <option value='2' className='dropDOptions'>
            2
          </option>
          <option value='3' className='dropDOptions'>
            3
          </option>
        </select>
      </div>
    );
  }
  return dropDown;
};

export default DropDown;

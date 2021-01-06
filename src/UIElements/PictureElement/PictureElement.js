import './PictureElement.css';

const PictureElement = (props) => {
  let classvalue = '';
  if (props.date < 12) {
    classvalue = 'morning_image';
  } else if (props.date >= 12 && props.date <= 16) {
    classvalue = 'afternoon_image';
  } else if (props.date >= 17 && props.date < 24) {
    classvalue = 'evening_image';
  }

  return (
    <section className={`image_container ${classvalue}`}>
      <div className='renderedValue'>{props.children}</div>
    </section>
  );
};

export default PictureElement;

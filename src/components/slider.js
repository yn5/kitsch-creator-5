import React from 'react';
import T from 'prop-types';

function Slider({ min, max, value, onChange }) {
  return (
    <input type="range" min={min} max={max} value={value} onChange={onChange} />
  );
}

Slider.propTypes = {
  min: T.number.isRequired,
  max: T.number.isRequired,
  value: T.number.isRequired,
  onChange: T.func.isRequired,
};

export default Slider;

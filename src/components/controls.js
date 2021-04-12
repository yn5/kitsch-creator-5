import React from 'react';
import Slider from './slider';
import { ControlContainer, Label } from './_styled/controls.styled';

function Controls({ config }) {
  return config.map((control) => {
    const { type, id } = control;

    switch (type) {
      case 'slider': {
        const { min, max, value, onChange } = control;

        return (
          <ControlContainer key={id}>
            <Label>{id}</Label>
            <Slider min={min} max={max} value={value} onChange={onChange} />
          </ControlContainer>
        );
      }
      default: {
        return `There is no code for a control of type ${type}`;
      }
    }
  });
}

export default Controls;

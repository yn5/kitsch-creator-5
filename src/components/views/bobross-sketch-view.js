/* eslint-disable no-param-reassign */
import React, { PureComponent } from 'react';
import P5 from 'p5';
import bobrossSketch from '../../lib/sketches/bobross';
import { Container } from './_styled/bobross-sketch-view.styled';

function s(sketch) {
  sketch.setup = bobrossSketch.setup(sketch);
  sketch.draw = bobrossSketch.draw(sketch);
}

export default class BobrossSketchView extends PureComponent {
  componentDidMount() {
    new P5(s, this.component); // eslint-disable-line no-new
  }

  render() {
    return <Container innerRef={(comp) => { this.component = comp; }} />;
  }
}

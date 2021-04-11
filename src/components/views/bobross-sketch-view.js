/* eslint-disable no-param-reassign */
import React, { PureComponent } from 'react';
import P5 from 'p5';
import BobrossSketch from '../../lib/sketches/bobross';
import {
  SketchContainer,
  TextButton,
  Container,
  OutputImage,
  Overlay,
  Header,
  Title,
} from './_styled/bobross-sketch-view.styled';

function getPngDataUrl(canvas) {
  const pngDataUrl = canvas.childNodes?.[0]?.toDataURL('image/png');

  return pngDataUrl;
}

function setupP5(sketchInstance, p5Sketch, width, height) {
  p5Sketch.setup = sketchInstance.setup(p5Sketch, width, height);
  p5Sketch.draw = sketchInstance.draw(p5Sketch);
}

export default class BobrossSketchView extends PureComponent {
  constructor() {
    super();

    this.state = {
      paused: false,
      pngDataUrl: null,
    };
    this.sketch = new BobrossSketch();
  }

  componentDidMount() {
    // Without the setTime .getBoundingClientRect() does not return
    // desired results.
    setTimeout(() => {
      const boundingClientRect = this.component.getBoundingClientRect();
      // eslint-disable-next-line no-new
      new P5(
        (p5Sketch) =>
          setupP5(
            this.sketch,
            p5Sketch,
            boundingClientRect.width,
            boundingClientRect.height
          ),
        this.component
      );
    }, 1);
  }

  handleClickPause = () => {
    const { paused } = this.state;

    this.sketch.togglePause();

    this.setState({
      paused: !paused,
    });
  };

  handleClickRenderToImage = () => {
    if (!this.component) {
      return;
    }

    const pngDataUrl = getPngDataUrl(this.component);
    this.setState({
      pngDataUrl,
    });
  };

  handleCloseOverlay = () => {
    this.setState({
      pngDataUrl: null,
    });
  };

  handleClickClear = () => {
    this.sketch.clear();
  };

  render() {
    const { paused, pngDataUrl } = this.state;

    return (
      <Container>
        <Header>
          <TextButton onClick={this.handleClickPause} type="button">
            {paused ? 'Play' : 'Pause'}
          </TextButton>
          <TextButton onClick={this.handleClickClear} type="button">
            Clear
          </TextButton>
          <TextButton onClick={this.handleClickRenderToImage} type="button">
            Render to image
          </TextButton>
        </Header>
        <SketchContainer
          ref={(comp) => {
            this.component = comp;
          }}
        />
        {pngDataUrl && (
          <Overlay>
            <Header>
              <Title>
                You can save the image by right clicking it and using the
                context menu
              </Title>
              <TextButton onClick={this.handleCloseOverlay} type="button">
                Close overlay
              </TextButton>
            </Header>
            <OutputImage alt="Rendered output" src={pngDataUrl} />
          </Overlay>
        )}
      </Container>
    );
  }
}

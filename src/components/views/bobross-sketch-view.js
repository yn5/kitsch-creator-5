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
  Modal,
} from './_styled/bobross-sketch-view.styled';
import Controls from '../controls';

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
      controlsOpen: false,
      paused: false,
      pngDataUrl: null,
      positionXJitter: 0.004,
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

  handleClickControls = () => {
    this.setState({
      controlsOpen: true,
    });
  };

  handleCloseControls = () => {
    this.setState({
      controlsOpen: false,
    });
  };

  render() {
    const { controlsOpen, paused, pngDataUrl, positionXJitter } = this.state;
    const controlsConfig = [
      {
        type: 'slider',
        id: 'positionXJitter',
        min: 1,
        max: 1000,
        value: Number(positionXJitter),
        onChange: (e) => {
          const { value } = e.target;
          const convertedValue = (value / 1000) * 0.01 + 0.001;

          this.sketch.setPositionXJitter(convertedValue);

          this.setState({
            positionXJitter: value,
          });
        },
      },
    ];

    return (
      <Container>
        <Header>
          <TextButton onClick={this.handleClickControls} type="button">
            Show controls
          </TextButton>
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
        {controlsOpen && (
          <Modal>
            <TextButton onClick={this.handleCloseControls} type="button">
              Close overlay
            </TextButton>
            <Controls config={controlsConfig} />
          </Modal>
        )}
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

/* eslint-disable no-param-reassign */
import React, { PureComponent } from 'react';
import P5 from 'p5';
import bobrossSketch from '../../lib/sketches/bobross';
import {
  Button,
  CloseButton,
  Container,
  OutputImage,
  Overlay,
  OverlayHeader,
  Title,
} from './_styled/bobross-sketch-view.styled';

function getPngDataUrl(canvas) {
  const pngDataUrl = canvas.childNodes?.[0]?.toDataURL('image/png');

  return pngDataUrl;
}

function setupP5(sketch) {
  sketch.setup = bobrossSketch.setup(sketch);
  sketch.draw = bobrossSketch.draw(sketch);
}

export default class BobrossSketchView extends PureComponent {
  constructor() {
    super();

    this.state = {
      pngDataUrl: null,
    };
  }

  componentDidMount() {
    new P5(setupP5, this.component); // eslint-disable-line no-new
  }

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

  render() {
    const { pngDataUrl } = this.state;

    return (
      <>
        <Button onClick={this.handleClickRenderToImage} type="button">
          Render to image
        </Button>
        <Container
          ref={(comp) => {
            this.component = comp;
          }}
        />
        {pngDataUrl && (
          <Overlay>
            <OverlayHeader>
              <Title>
                You can save the image by right clicking it and using the
                context menu
              </Title>
              <CloseButton onClick={this.handleCloseOverlay} type="button">
                Close overlay
              </CloseButton>
            </OverlayHeader>
            <OutputImage alt="Rendered output" src={pngDataUrl} />
          </Overlay>
        )}
      </>
    );
  }
}

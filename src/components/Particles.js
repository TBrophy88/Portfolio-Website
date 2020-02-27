import React, { Component } from 'react';
import { FastLayer } from 'react-konva';

class Particles extends Component {
  _particles = {};
  layerRef = React.createRef();

  componentDidMount() {
    this.canvas = this.layerRef.current.canvas._canvas;
    this.canvasContext = this.canvas.getContext('2d');
  }

  drawParticle(particle) {
    let {x, y } = particle;

    this.canvasContext.beginPath();
    this.canvasContext.arc(x, y, 4, 0, 2* Math.PI, false);
    this.canvasContext.fillStyle = particle.color;
    this.canvasContext.fill();
  }

  componentDidUpdate() {
    let particles = this.props.particles;

    this.canvasContext.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    this.canvasContext.lineWidth = 1;
    this.canvasContext.strokeStyle = 'black';

    for (let i = 0; i < particles.length; i++) {
      this.drawParticle(particles[i]);
    }
  }

  render() {
    return <FastLayer ref={this.layerRef} listening={false} />;
  }
}

export default Particles;

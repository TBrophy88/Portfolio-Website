import React, { Component } from 'react';
import {event as d3Event, select as d3Select, mouse as d3Mouse, touches as d3Touches, now as d3Now } from 'd3';
import { Stage } from 'react-konva';

import './index.css';

import Particles from './Particles';

class App extends Component {
  svgWrap = React.createRef();

  componentDidMount() {
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.handleChangeVelocity = this.handleChangeVelocity.bind(this);
    this.handleChangeGravity = this.handleChangeGravity.bind(this);
    let svg = d3Select(this.svgWrap.current);

    svg.on('mousedown', () => {
      if(!(this.props.mousePos[0] < 280 && this.props.mousePos[1] > (this.props.svgHeight - 85))) {
        d3Event.preventDefault();
      }
      this.updateMousePos();
      this.props.startParticles();
    });
    svg.on('touchstart', () => {
      if(!(this.props.mousePos[0] < 280 && this.props.mousePos[1] > (this.props.svgHeight - 85))) {
        d3Event.preventDefault();
      }
      this.updateTouchPos();
      this.props.startParticles();
    });
    svg.on('mousemove', () => {
      if(!(this.props.mousePos[0] < 280 && this.props.mousePos[1] > (this.props.svgHeight - 85))) {
        d3Event.preventDefault();
      }
      this.updateMousePos();
    });
    svg.on('touchmove', () => {
      if(!(this.props.mousePos[0] < 280 && this.props.mousePos[1] > (this.props.svgHeight - 85))) {
        d3Event.preventDefault();
      }
      this.updateTouchPos();
    });
    svg.on('mouseup', () => {
      if(!(this.props.mousePos[0] < 280 && this.props.mousePos[1] > (this.props.svgHeight - 85))) {
        d3Event.preventDefault();
      }
      this.props.stopParticles();
    });
    svg.on('touchend', () => {
      if(!(this.props.mousePos[0] < 280 && this.props.mousePos[1] > (this.props.svgHeight - 85))) {
        d3Event.preventDefault();
      }
      this.props.stopParticles();
    });
    svg.on('mouseleave', () => {
      if(!(this.props.mousePos[0] < 280 && this.props.mousePos[1] > (this.props.svgHeight - 85))) {
        d3Event.preventDefault();
      }
      this.props.stopParticles();
    });
  }

  handleChangeTimeFlowState(newTimeFlowState) {
    if(newTimeFlowState === 'playPause'){
      if(this.props.timeFlowState !== 'PLAY'){
        newTimeFlowState = 'PLAY';
      } else {
        newTimeFlowState = 'PAUSE';
      }
    }
    if(newTimeFlowState !== this.props.timeFlowState){
      let timeStateChanged = d3Now();
      this.props.changeTimeFlowState(newTimeFlowState, timeStateChanged);
    }

  }

  updateMousePos() {
    let [x, y] = d3Mouse(this.svgWrap.current);
    this.props.updateMousePos(x, y);
  }

  updateTouchPos() {
    let [x, y] = d3Touches(this.svgWrap.current)[d3Touches(this.svgWrap.current).length - 1];
    this.props.updateMousePos(x, y);
  }

  handleChangeQuantity(event) {
    this.props.changeQuantity(event.target.value, this.props.realTime);
  }

  handleChangeVelocity(event) {
    this.props.changeVelocity(event.target.value, this.props.realTime);
  }

  handleChangeGravity(event) {
    this.props.changeGravity(event.target.value, this.props.realTime);
  }

  render() {
    let playPauseImg = "./2404383.svg";
    if(this.props.timeFlowState === "PAUSE"){
      playPauseImg = "./2404385.svg";
    }

    //65300
    let ms = this.props.realTime % 1000;  //300
    let totalSRemaining = (this.props.realTime - ms) / 1000;  //65000 / 1000 = 65
    let sec = totalSRemaining % 60; //5
    let min = (totalSRemaining - sec) / 60; //65 - 5 = 60 / 60 = 1
    if(sec < 10){
      sec = '0' + sec;
    }
    let realTimeString = min + ':' + sec + ':' + ms;
    return (
      <div
        style=
          {{
            width: this.props.svgWidth,
            height: this.props.svgHeight,
            position: 'aboslute',
            top: '0px',
            left: '0px',
            background: '#3C3F58'
          }}
        ref={this.svgWrap}
      >
        <Stage
          width={this.props.svgWidth}
          height={this.props.svgHeight}
        >
          <Particles particles={this.props.particles} />
        </Stage>
        <div className="content">
          <div className="content-container">
            <h1 className="unselectable">Hello</h1>
            <h3 className="unselectable">I'm <span>Tom Brophy</span></h3>
            <h6 className="unselectable">Full Stack Web Developer</h6>
            <div className="social-networks">
              <a className="social-network-link unselectable" href="https://www.linkedin.com/in/tom-brophy-b8267a182">
                <img
                  className="social-network-image unselectable"
                  src="https://image.flaticon.com/icons/svg/145/145807.svg"
                  alt="LinkedIn"

                />
              </a>
              <a className="social-network-link unselectable" href="https://github.com/TBrophy88">
                <img
                  className="social-network-image unselectable"
                  src="https://image.flaticon.com/icons/svg/733/733553.svg"
                  alt="GitHub"
                />
              </a>
              <a draggable="false" className="social-network-link unselectable" href="https://stackexchange.com/users/17671305/tom-brophy">
                <img
                  className="social-network-image unselectable"
                  src="https://image.flaticon.com/icons/svg/2111/2111628.svg"
                  alt="Stack Exchange"
                />
              </a>
              <a className="social-network-link unselectable" href="mailto:t.brophy@gmail.com">
                <img
                  className="social-network-image unselectable"
                  src="https://image.flaticon.com/icons/png/512/1634/1634120.png"
                  alt="Email"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="menu">
          <ul>
            <li><a href="/#" className="unselectable">Home</a></li>
            <li><a href="/#" className="unselectable">About</a></li>
            <li><a href="/#" className="unselectable">Work</a></li>
            <li><a href="/#" className="unselectable">Skills</a></li>
            <li><a href="/#" className="unselectable">Projects</a></li>
            <li><a href="/#" className="unselectable">Contact</a></li>
          </ul>
        </div>
        <div className="controls">
          <div className="controls-container">
            <div className="slider-controls">
              <div className="input-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  id="quantity"
                  type="range"
                  min="1"
                  max="30"
                  value={this.props.quantity}
                  onChange={this.handleChangeQuantity}
                  step="1"
                  disabled={!this.props.controlsEnabled}
                />
              </div>
              <div className="input-group">
                <label htmlFor="velocity">Velocity</label>
                <input
                  id="veocity"
                  type="range"
                  min="0.1"
                  max="3"
                  value={this.props.velocity}
                  onChange={this.handleChangeVelocity}
                  step="0.1"
                  disabled={!this.props.controlsEnabled}
                />
              </div>
              <div className="input-group">
                <label htmlFor="gravity">Gravity</label>
                <input
                  id="gravity"
                  type="range"
                  min="0"
                  max="3"
                  value={this.props.gravity}
                  onChange={this.handleChangeGravity}
                  step="0.1"
                  disabled={!this.props.controlsEnabled}
                />
              </div>
            </div>
            <div className="time-controls-group">
              <img
                className={this.props.timeFlowState === "REWIND" ? "control-button active" : "control-button"}
                id='button-rewind'
                src="./2404395.svg"
                alt="rewind"
                onClick = {() => this.handleChangeTimeFlowState('REWIND')}
              />
              <img
                className={this.props.timeFlowState === "PLAY" || this.props.timeFlowState === "PAUSE" ? "control-button active" : "control-button"}
                id="button-play-pause"
                src={playPauseImg}
                alt="play pause"
                onClick = {() => this.handleChangeTimeFlowState('playPause')}
              />
              <img
                className={this.props.timeFlowState === "FAST_FORWARD" ? "control-button active" : "control-button"}
                id="button-fast-forward"
                src="./2404393.svg"
                alt="fast forward"
                onClick = {() => this.handleChangeTimeFlowState('FAST_FORWARD')}
              />
              <h5>{realTimeString}</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

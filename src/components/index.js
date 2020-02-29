//react, redux, d3 and konva
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { Stage } from 'react-konva';

//styles
import './index.css';

//actions
import {
  tickTime,
  tickerStarted,
  startParticles,
  stopParticles,
  updateMousePos,
  logCreatedParticles,
  logKilledParticles,
  updateKilledParticles,
  updateLastFrameTime,
  updateLastIntervalTime,
  updateRealTime,
  updateParticleIndex,
  updateParticles,
  changeTimeFlowState,
  changeQuantity,
  changeVelocity,
  changeGravity,
  updateControls,
  updateSettingsChangeLog,
  reset,
  resizeScreen
} from '../actions';

//components
import NavBar from './NavBar/';
import Particles from './Particles';

const
  randNormal = d3.randomNormal(0.3, 2),
  randNormal2 = d3.randomNormal(0.5, 1.8);

class App extends Component {
  svgWrap = React.createRef();
  timer = null;

  componentWillUnmount() {
    this.timer.stop();   //stop the timer
    this.props.reset();  //reset state to initialState
  }

  componentDidMount() {
    this.props.resizeScreen(window.innerWidth, window.innerHeight);
    const { isTickerStarted } = this.props.isTickerStarted;

    if (!isTickerStarted) {
      this.props.tickerStarted();
      this.timer = d3.timer((function(duration) {
        //
        //general animation loop
        //

        //set up some variables
        let newFrameTime = d3.now();
        let realTime = this.props.realTime;
        if(this.props.timeFlowState === 'PLAY'){
          realTime += (newFrameTime - this.props.lastFrameTime);
        } else if(this.props.timeFlowState === 'FAST_FORWARD') {
          realTime += (newFrameTime - this.props.lastFrameTime) * 2;
        } else if(this.props.timeFlowState === 'REWIND'){
          realTime -= (newFrameTime - this.props.lastFrameTime);
        }
        let multiplier = ((newFrameTime - this.props.lastFrameTime) / (1000 / 60)) * this.props.velocity;
        let oldParticles = this.props.particles.slice(0);
        let killedParticles = this.props.killedParticles.slice(0);
        let newParticles = [];
        let particleIndex = this.props.particleIndex;
        let Gravity = this.props.gravity;


        //user is clicking/touching, create new particles (if not rewinding)
        if (this.props.generateParticles && this.props.timeFlowState !== 'REWIND') {
          let colorCounter = particleIndex % 3;
          let particlesPerTick = this.props.particlesPerTick * this.props.quantity;
          if(this.props.timeFlowState === "FAST_FORWARD"){
            particlesPerTick = particlesPerTick * 2;
          }
          for (let i = 0; i < particlesPerTick; i++) {
            particleIndex = particleIndex + 1;
            let particle = {
              id: particleIndex,
              x: this.props.mousePos[0],
              y: this.props.mousePos[1]
            };

            particle.vector = [
              particle.id % 2 ? -randNormal() : randNormal(),
              -randNormal2() * 3.3
            ];

            let color = '#43455C';
            if(colorCounter === 1){
              color = '#2E3047';
              colorCounter = colorCounter + 1;
            } else if (colorCounter === 2){
              color = '#707793';
              colorCounter = colorCounter + 1;
            } else {
              colorCounter = 1;
            }
            particle.color = color;

            particle.createdAt = realTime;

            newParticles.unshift(particle);
          }
        }

        //create a new particle on an interval
        if(this.props.timeFlowState !== 'PAUSE' && this.props.timeFlowState !== 'REWIND'){
          let intervalTimer = 1000 / (this.props.particlesPerTick * this.props.quantity);
          if(this.props.timeFlowState === "FAST_FORWARD"){
            intervalTimer = intervalTimer / 2;
          }
          if(newFrameTime - this.props.lastIntervalTime > intervalTimer){
            particleIndex = particleIndex + 1;
            let particle = {
              id: particleIndex,
              x: this.props.mousePos[0],
              y: this.props.mousePos[1]
            };

            particle.vector = [
              particle.id % 2 ? -randNormal() : randNormal(),
              -randNormal2() * 3.3
            ];

            if(particleIndex % 3 === 0){
              particle.color = '#2E3047';
            } else if (particleIndex % 3 === 1){
              particle.color = '#707793';
            } else {
              particle.color = '#43455C';
            }

            particle.createdAt = realTime;

            newParticles.unshift(particle);
            this.props.updateLastIntervalTime(newFrameTime);
          }
        }

        this.props.updateParticleIndex(particleIndex);

        //kill dead particles (if not paused or rewinding)
        if(this.props.timeFlowState !== 'PAUSE' && this.props.timeFlowState !== 'REWIND'){
          let deadParticles = oldParticles
            .filter(p => {
              return !(p.y <= this.props.svgHeight);
            })
            .map(p => {
              p.killedAt = realTime;
              return p;
            });
          this.props.logKilledParticles(deadParticles);
        }

        //unkill and uncreate particles while rewinding
        if(this.props.timeFlowState === 'REWIND'){
          let timeRewinding = newFrameTime - this.props.timeStateChanged;

          if(timeRewinding > 60000 || realTime <= 0){
            this.props.changeTimeFlowState('PLAY', null);
          } else {
            //unkill
            let unkilledParticles = killedParticles
              .filter(p => {
                return (p.killedAt > realTime)
              })
              .map(p => {
                p.killedAt = null;
                return p;
              });
            let newKilledParticles = killedParticles
              .filter(p => {
                return (p.killedAt < realTime)
              });
            newParticles = newParticles.concat(unkilledParticles);
            this.props.updateKilledParticles(newKilledParticles);

            //uncreate
            oldParticles = oldParticles
              .filter(p => {
                return (p.createdAt < realTime)
              });
          }
        }

        //move particles if not paused
        let updatedParticles = oldParticles.concat(newParticles);
        if(this.props.timeFlowState !== 'PAUSE'){
          if(this.props.timeFlowState === 'REWIND'){
            updatedParticles = updatedParticles
              .map(p => {
                if(p.x < 2){
                  p.vector[0] = -Math.abs(p.vector[0]);
                } if (p.x > (this.props.svgWidth - 2)) {
                  p.vector[0] = Math.abs(p.vector[0]);
                }
                if(p.y < 2) {
                  p.vector[1] = -Math.abs(p.vector[1]);
                }
                let [vx, vy] = p.vector;
                p.x += vx * -multiplier;
                p.y += vy * -multiplier;
                p.vector[1] += Gravity * -multiplier;
                return p;
              });
          } else if(this.props.timeFlowState === 'FAST_FORWARD'){
            updatedParticles = updatedParticles
              .filter(p => {
                return !(p.y > this.props.svgHeight)
              })
              .map(p => {
                if(p.x < 2){
                  p.vector[0] = Math.abs(p.vector[0]);
                } if (p.x > (this.props.svgWidth - 2)) {
                  p.vector[0] = -Math.abs(p.vector[0]);
                }
                if(p.y < 2) {
                  p.vector[1] = Math.abs(p.vector[1]);
                }
                let [vx, vy] = p.vector;
                p.x += vx * multiplier * 2;
                p.y += vy * multiplier * 2;
                p.vector[1] += Gravity * multiplier * 2;
                return p;
              });
          } else {
            //playing..
            updatedParticles = updatedParticles
              .filter(p => {
                return !(p.y > this.props.svgHeight)
              })
              .map(p => {
                if(p.x < 2){
                  p.vector[0] = Math.abs(p.vector[0]);
                } if (p.x > (this.props.svgWidth - 2)) {
                  p.vector[0] = -Math.abs(p.vector[0]);
                }
                if(p.y < 2) {
                  p.vector[1] = Math.abs(p.vector[1]);
                }
                let [vx, vy] = p.vector;
                p.x += vx * multiplier;
                p.y += vy * multiplier;
                p.vector[1] += Gravity * multiplier;
                return p;
              });
          }
        }

        //last but not least, if we are rewinding, undo settings changes
        if(this.props.timeFlowState === 'REWIND'){
          let settingsChangeLog = this.props.settingsChangeLog.slice(0);
          settingsChangeLog
            .filter(settingChange => {
              return (settingChange.timeChanged >= realTime)
            })
            .map(settingChange => {
                  this.props.updateControls(settingChange.control, settingChange.previousValue);
                  return settingChange;
            });

          let newSettingsChangeLog = settingsChangeLog
            .filter(settingChange => {
              return (settingChange.timeChanged < realTime)
            });
          this.props.updateSettingsChangeLog(newSettingsChangeLog);
        }

        this.props.updateParticles(updatedParticles);
        this.props.updateLastFrameTime(newFrameTime);
        this.props.updateRealTime(realTime);

      }).bind(this));
    }

    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.handleChangeVelocity = this.handleChangeVelocity.bind(this);
    this.handleChangeGravity = this.handleChangeGravity.bind(this);
    let svg = d3.select(this.svgWrap.current);

    svg.on('mousedown', () => {
      if(!(this.props.mousePos[0] < 280 && this.props.mousePos[1] > (this.props.svgHeight - 85))) {
        d3.event.preventDefault();
      }
      this.updateMousePos();
      this.props.startParticles();
    });
    svg.on('touchstart', () => {
      if(!(this.props.mousePos[0] < 280 && this.props.mousePos[1] > (this.props.svgHeight - 85))) {
        d3.event.preventDefault();
      }
      this.updateTouchPos();
      this.props.startParticles();
    });
    svg.on('mousemove', () => {
      if(!(this.props.mousePos[0] < 280 && this.props.mousePos[1] > (this.props.svgHeight - 85))) {
        d3.event.preventDefault();
      }
      this.updateMousePos();
    });
    svg.on('touchmove', () => {
      if(!(this.props.mousePos[0] < 280 && this.props.mousePos[1] > (this.props.svgHeight - 85))) {
        d3.event.preventDefault();
      }
      this.updateTouchPos();
    });
    svg.on('mouseup', () => {
      if(!(this.props.mousePos[0] < 280 && this.props.mousePos[1] > (this.props.svgHeight - 85))) {
        d3.event.preventDefault();
      }
      this.props.stopParticles();
    });
    svg.on('touchend', () => {
      if(!(this.props.mousePos[0] < 280 && this.props.mousePos[1] > (this.props.svgHeight - 85))) {
        d3.event.preventDefault();
      }
      this.props.stopParticles();
    });
    svg.on('mouseleave', () => {
      if(!(this.props.mousePos[0] < 280 && this.props.mousePos[1] > (this.props.svgHeight - 85))) {
        d3.event.preventDefault();
      }
      this.props.stopParticles();
    });
  }

  updateMousePos() {
    let [x, y] = d3.mouse(this.svgWrap.current);
    this.props.updateMousePos(x, y);
  }

  updateTouchPos() {
    let [x, y] = d3.touches(this.svgWrap.current)[d3.touches(this.svgWrap.current).length - 1];
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

  handleChangeTimeFlowState(newTimeFlowState) {
    if(newTimeFlowState === 'playPause'){
      if(this.props.timeFlowState !== 'PLAY'){
        newTimeFlowState = 'PLAY';
      } else {
        newTimeFlowState = 'PAUSE';
      }
    }
    if(newTimeFlowState !== this.props.timeFlowState){
      let timeStateChanged = d3.now();
      this.props.changeTimeFlowState(newTimeFlowState, timeStateChanged);
    }
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
        <NavBar />
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
                className={this.props.timeFlowState === "REWIND" ? "control-button active-control-button" : "control-button"}
                id='button-rewind'
                src="./2404395.svg"
                alt="rewind"
                onClick = {() => this.handleChangeTimeFlowState('REWIND')}
              />
              <img
                className={this.props.timeFlowState === "PLAY" || this.props.timeFlowState === "PAUSE" ? "control-button active-control-button" : "control-button"}
                id="button-play-pause"
                src={playPauseImg}
                alt="play pause"
                onClick = {() => this.handleChangeTimeFlowState('playPause')}
              />
              <img
                className={this.props.timeFlowState === "FAST_FORWARD" ? "control-button active-control-button" : "control-button"}
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

const mapStateToProps = ({
  generateParticles,
  mousePos,
  particlesPerTick,
  particleIndex,
  isTickerStarted,
  svgWidth,
  svgHeight,
  particles,
  lastFrameTime,
  lastIntervalTime,
  realTime,
  createdParticles,
  killedParticles,
  timeFlowState,
  timeStateChanged,
  quantity,
  velocity,
  gravity,
  settingsChangeLog,
  controlsEnabled
}) => ({
  generateParticles,
  mousePos,
  particlesPerTick,
  particleIndex,
  isTickerStarted,
  svgWidth,
  svgHeight,
  particles,
  lastFrameTime,
  lastIntervalTime,
  realTime,
  createdParticles,
  killedParticles,
  timeFlowState,
  timeStateChanged,
  quantity,
  velocity,
  gravity,
  settingsChangeLog,
  controlsEnabled
});

const mapDispatchToProps = {
  tickTime,
  tickerStarted,
  startParticles,
  stopParticles,
  updateMousePos,
  logCreatedParticles,
  logKilledParticles,
  updateKilledParticles,
  updateLastFrameTime,
  updateLastIntervalTime,
  updateRealTime,
  updateParticleIndex,
  updateParticles,
  changeTimeFlowState,
  changeQuantity,
  changeVelocity,
  changeGravity,
  updateControls,
  updateSettingsChangeLog,
  reset,
  resizeScreen
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

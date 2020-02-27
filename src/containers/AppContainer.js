import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as d3 from 'd3';
import { randomNormal } from 'd3';

import App from '../components';
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
  updateSettingsChangeLog
} from '../actions';

const
  randNormal = randomNormal(0.3, 2),
  randNormal2 = randomNormal(0.5, 1.8);

class AppContainer extends Component {

  componentDidMount() {
    const { isTickerStarted } = this.props.isTickerStarted;

    if (!isTickerStarted) {
      console.log('starting ticker');
      this.props.tickerStarted();
      d3.timer((function(duration) {
        //general animation loop
          //uncreate particles (if rewinding)
          //unkill particles (if rewinding)

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


        //create new particles (if not rewinding)
        if (this.props.generateParticles && this.props.timeFlowState !== 'REWIND') {
          let colorCounter = 1;
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

        //this.props.logCreatedParticles(newParticles);
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

        if(this.props.timeFlowState === 'REWIND'){
          let timeRewinding = newFrameTime - this.props.timeStateChanged;
          //let timeInThePast = this.props.timeStateChanged - timeRewinding;

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
  }
newParticles
  render() {
    const { svgWidth, svgHeight, particles } = this.props;

    return (
      <App
        svgWidth={svgWidth}
        svgHeight={svgHeight}
        particles={particles}
        startParticles={this.props.startParticles}
        stopParticles={this.props.stopParticles}
        mousePos={this.props.mousePos}
        updateMousePos={this.props.updateMousePos}
        timeFlowState={this.props.timeFlowState}
        changeTimeFlowState={this.props.changeTimeFlowState}
        realTime={this.props.realTime}
        quantity={this.props.quantity}
        velocity={this.props.velocity}
        gravity={this.props.gravity}
        changeQuantity={this.props.changeQuantity}
        changeVelocity={this.props.changeVelocity}
        changeGravity={this.props.changeGravity}
        controlsEnabled={this.props.controlsEnabled}
      />
    );
  }
};

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
  updateSettingsChangeLog
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);

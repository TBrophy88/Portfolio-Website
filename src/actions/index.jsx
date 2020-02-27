export const TIME_TICK = "TIME_TICK";
export const TICKER_STARTED = "TICKER_STARTED";
export const START_PARTICLES = "START_PARTICLES";
export const STOP_PARTICLES = "STOP_PARTICLES";
export const UPDATE_MOUSE_POS = "UPDATE_MOUSE_POS";
export const RESIZE_SCREEN = "RESIZE_SCREEN";
export const LOG_CREATED_PARTICLES = "LOG_CREATED_PARTICLES";
export const LOG_KILLED_PARTICLES = "LOG_KILLED_PARTICLES";
export const UPDATE_KILLED_PARTICLES = "UPDATE_KILLED_PARTICLES";
export const UPDATE_LAST_INTERVAL_TIME = "UPDATE_LAST_INTERVAL_TIME";
export const UPDATE_LAST_FRAME_TIME = "UPDATE_LAST_FRAME_TIME";
export const UPDATE_REAL_TIME = "UPDATE_REAL_TIME";
export const UPDATE_PARTICLE_INDEX = "UPDATE_PARTICLE_INDEX";
export const UPDATE_PARTICLES = "UPDATE_PARTICLES";
export const CHANGE_TIME_FLOW_STATE = "CHANGE_TIME_FLOW_STATE";
export const CHANGE_QUANTITY = "CHANGE_QUANTITY";
export const CHANGE_VELOCITY = "CHANGE_VELOCITY";
export const CHANGE_GRAVITY = "CHANGE_GRAVITY";
export const UPDATE_CONTROLS = "UPDATE_CONTROLS";
export const UPDATE_SETTINGS_CHANGE_LOG = "UPDATE_SETTINGS_CHANGE_LOG";

export function tickTime() {
  return {
    type: TIME_TICK
  };
}

export function changeQuantity(newQuantity, timeChanged){
  return {
    type: "CHANGE_QUANTITY",
    quantity: newQuantity,
    time: timeChanged
  };
}

export function changeVelocity(newVelocity, timeChanged){
  return {
    type: "CHANGE_VELOCITY",
    velocity: newVelocity,
    time: timeChanged
  };
}

export function changeGravity(newGravity, timeChanged){
  return {
    type: "CHANGE_GRAVITY",
    gravity: newGravity,
    time: timeChanged
  };
}

export function updateControls(control, value){
  return {
    type: "UPDATE_CONTROLS",
    control: control,
    value: value
  }
}

export function updateSettingsChangeLog(newSettingsChangeLog){
  return {
    type: "UPDATE_SETTINGS_CHANGE_LOG",
    newSettingsChangeLog: newSettingsChangeLog
  }
}

export function changeTimeFlowState(newTimeFlowState, timeStateChanged) {
  return {
    type: CHANGE_TIME_FLOW_STATE,
    newTimeFlowState: newTimeFlowState,
    timeStateChanged: timeStateChanged
  }
}

export function logCreatedParticles(particles) {
  return {
    type: LOG_CREATED_PARTICLES,
    particles: particles
  }
}

export function updateKilledParticles(particles) {
  return {
    type: UPDATE_KILLED_PARTICLES,
    particles: particles
  }
}

export function logKilledParticles(particles) {
  return {
    type: LOG_KILLED_PARTICLES,
    particles: particles
  }
}

export function updateParticles(particles) {
  return {
    type: UPDATE_PARTICLES,
    particles: particles
  }
}

export function updateLastIntervalTime(time) {
  return {
    type: UPDATE_LAST_INTERVAL_TIME,
    time: time
  }
}

export function updateLastFrameTime(time) {
  return {
    type: UPDATE_LAST_FRAME_TIME,
    time: time
  }
}

export function updateRealTime(time) {
  return {
    type: UPDATE_REAL_TIME,
    time: time
  }
}

export function updateParticleIndex(particleIndex) {
  return {
    type: UPDATE_PARTICLE_INDEX,
    particleIndex: particleIndex
  }
}

export function tickerStarted() {
  return {
    type: TICKER_STARTED
  };
}

export function startParticles() {
  return {
    type: START_PARTICLES
  };
}

export function stopParticles() {
  return {
    type: STOP_PARTICLES
  };
}

export function updateMousePos(x, y) {
  return {
    type: UPDATE_MOUSE_POS,
    x: x,
    y: y
  };
}

export function resizeScreen(width, height) {
  return {
    type: RESIZE_SCREEN,
    width: width,
    height: height
  };
}

export const
  TIME_TICK = "TIME_TICK",
  TICKER_STARTED = "TICKER_STARTED",
  START_PARTICLES = "START_PARTICLES",
  STOP_PARTICLES = "STOP_PARTICLES",
  UPDATE_MOUSE_POS = "UPDATE_MOUSE_POS",
  RESIZE_SCREEN = "RESIZE_SCREEN",
  LOG_CREATED_PARTICLES = "LOG_CREATED_PARTICLES",
  LOG_KILLED_PARTICLES = "LOG_KILLED_PARTICLES",
  UPDATE_KILLED_PARTICLES = "UPDATE_KILLED_PARTICLES",
  UPDATE_LAST_INTERVAL_TIME = "UPDATE_LAST_INTERVAL_TIME",
  UPDATE_LAST_FRAME_TIME = "UPDATE_LAST_FRAME_TIME",
  UPDATE_REAL_TIME = "UPDATE_REAL_TIME",
  UPDATE_PARTICLE_INDEX = "UPDATE_PARTICLE_INDEX",
  UPDATE_PARTICLES = "UPDATE_PARTICLES",
  CHANGE_TIME_FLOW_STATE = "CHANGE_TIME_FLOW_STATE",
  CHANGE_QUANTITY = "CHANGE_QUANTITY",
  CHANGE_VELOCITY = "CHANGE_VELOCITY",
  CHANGE_GRAVITY = "CHANGE_GRAVITY",
  UPDATE_CONTROLS = "UPDATE_CONTROLS",
  UPDATE_SETTINGS_CHANGE_LOG = "UPDATE_SETTINGS_CHANGE_LOG",
  RESET = "RESET";

export function reset() {
  return {
    type: RESET
  };
}

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

import { now as d3Now } from 'd3';

const initialState = {
  particles: [],
  createdParticles: [],
  killedParticles: [],
  particleIndex: 0,
  particlesPerTick: 1,
  svgWidth: 800,
  svgHeight: 600,
  isTickerStarted: false,
  generateParticles: false,
  mousePos: [null, null],
  lastFrameTime: null,
  lastIntervalTime: null,
  realTime: null,
  timeFlowState: 'PLAY',
  timeStateChanged: null,
  quantity: 3,
  velocity: 1,
  gravity: 0.5,
  settingsChangeLog: [],
  controlsEnabled: true
};

function appReducer(state, action) {
  switch (action.type) {
    case "TICKER_STARTED":
      return Object.assign({}, state, {
        isTickerStarted: true,
        lastFrameTime: d3Now(),
        lastIntervalTime: d3Now()
      });
    case "START_PARTICLES":
      return Object.assign({}, state, {
        generateParticles: true
      });
    case "STOP_PARTICLES":
      return Object.assign({}, state, {
        generateParticles: false
      });
    case "UPDATE_MOUSE_POS":
      return Object.assign({}, state, {
        mousePos: [action.x, action.y]
      });
    case "CHANGE_QUANTITY":
      let newSettingsChangeLog = state.settingsChangeLog;

      let previousUpdateIndex = newSettingsChangeLog.findIndex(settingChange => {
          return (settingChange.control === 'quantity' && settingChange.timeChanged === action.time)
        });

      if(previousUpdateIndex !== -1) {
        newSettingsChangeLog[previousUpdateIndex].newValue = action.quantity;
      } else {
        newSettingsChangeLog = newSettingsChangeLog.concat({
          control: 'quantity',
          previousValue: state.quantity,
          newValue: action.quantity,
          timeChanged: action.time
        })
      }
      return Object.assign({}, state, {
        settingsChangeLog: newSettingsChangeLog,
        quantity: action.quantity
      });
    case "CHANGE_VELOCITY":
      let newSettingsChangeLogV = state.settingsChangeLog;

      let previousUpdateIndexV = newSettingsChangeLogV.findIndex(settingChange => {
          return (settingChange.control === 'velocity' && settingChange.timeChanged === action.time)
        });

        if(previousUpdateIndexV !== -1) {
          newSettingsChangeLogV[previousUpdateIndexV].newValue = action.velocity;
        } else {
          newSettingsChangeLogV = newSettingsChangeLogV.concat({
            control: 'velocity',
            previousValue: state.velocity,
            newValue: action.velocity,
            timeChanged: action.time
          })
        }
      return Object.assign({}, state, {
        settingsChangeLog: newSettingsChangeLogV,
        velocity: action.velocity
      });
    case "CHANGE_GRAVITY":
      let newSettingsChangeLogG = state.settingsChangeLog;

      let previousUpdateIndexG = newSettingsChangeLogG.findIndex(settingChange => {
        return (settingChange.control === 'gravity' && settingChange.timeChanged === action.time)
      });

      if(previousUpdateIndexG !== -1) {
        newSettingsChangeLogG[previousUpdateIndexG].newValue = action.gravity;
      } else {
        newSettingsChangeLogG = newSettingsChangeLogG.concat({
          control: 'gravity',
          previousValue: state.gravity,
          newValue: action.gravity,
          timeChanged: action.time
        })
      }
      return Object.assign({}, state, {
        settingsChangeLog: newSettingsChangeLogG,
        gravity: action.gravity
      });
    case "UPDATE_CONTROLS":
      return Object.assign({}, state, {
        [action.control]: action.value
      });
    case "UPDATE_SETTINGS_CHANGE_LOG":
      return Object.assign({}, state, {
        settingsChangeLog: action.newSettingsChangeLog
      });
    case "RESIZE_SCREEN":
      return Object.assign({}, state, {
        svgWidth: action.width,
        svgHeight: action.height
      });
    case "UPDATE_PARTICLE_INDEX":
      return Object.assign({}, state, {
        particleIndex: action.particleIndex
      });
    case "LOG_CREATED_PARTICLES":
      let createdCutoff = d3Now() - 60000;
      let createdNewLog = state.createdParticles
        .filter(p => {
          return !(p.createdAt < createdCutoff);
        })
        .concat(action.particles);
      return Object.assign({}, state, {
        createdParticles: createdNewLog
      });
    case "LOG_KILLED_PARTICLES":
      let killedCutoff = state.realTime - 60000;
      let killedNewLog = state.killedParticles
        .filter(p => {
          return (p.killedAt > killedCutoff);
        })
        .concat(action.particles);
      return Object.assign({}, state, {
        killedParticles: killedNewLog
      });
    case "UPDATE_KILLED_PARTICLES":
      return Object.assign({}, state, {
        killedParticles: action.particles
      });
    case "UPDATE_PARTICLES":
      return Object.assign({}, state, {
        particles: action.particles
      });
    case "UPDATE_LAST_FRAME_TIME":
      return Object.assign({}, state, {
        lastFrameTime: action.time
      });
    case "UPDATE_REAL_TIME":
      return Object.assign({}, state, {
        realTime: action.time
      });
    case "UPDATE_LAST_INTERVAL_TIME":
      return Object.assign({}, state, {
        lastIntervalTime: action.time
      });
    case "CHANGE_TIME_FLOW_STATE":
      let controlsEnabled = true;
      if(action.newTimeFlowState === "REWIND") {
        controlsEnabled = false;
      }
      return Object.assign({}, state, {
        timeFlowState: action.newTimeFlowState,
        timeStateChanged: action.timeStateChanged,
        controlsEnabled: controlsEnabled
      });
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function (state = initialState, action) {
  return {
    ...appReducer(state, action),
  };
}

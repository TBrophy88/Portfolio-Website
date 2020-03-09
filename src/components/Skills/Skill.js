import React, { Component } from 'react';

class Skill extends Component {
  render() {
    let styleYes = {
      backgroundColor: '#3BBA9C'
    };
    let styleNo = {
      backgroundColor: '#43455C'
    };
    return (
      <div className='skill'>
        <div className='skill-name'>{this.props.data.name}</div>
        <div className = 'skill-level-container'>
          <div className='skill-point' style={this.props.data.level >= 1 ? styleYes : styleNo}></div>
          <div className='skill-point' style={this.props.data.level >= 2 ? styleYes : styleNo}></div>
          <div className='skill-point' style={this.props.data.level >= 3 ? styleYes : styleNo}></div>
          <div className='skill-point' style={this.props.data.level >= 4 ? styleYes : styleNo}></div>
          <div className='skill-point' style={this.props.data.level >= 5 ? styleYes : styleNo}></div>
        </div>
      </div>
    );
  }
};

export default Skill;

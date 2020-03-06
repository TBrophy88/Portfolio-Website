import React, { Component } from 'react';

class TimelineItem extends Component {
  render() {
    return (
      <div className='timeline-item'>
        <div className='timeline-item-content'>
          <div className='time'>{this.props.data.dateStart} to {this.props.data.dateEnd}</div>
          <div className='job-title'>{this.props.data.title}</div>
          <div className='job-company'>{this.props.data.company}</div>
          <span className='bar' />
        </div>
      </div>
    );
  }
};

export default TimelineItem;

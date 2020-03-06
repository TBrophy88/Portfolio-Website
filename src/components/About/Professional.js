import React, { Component } from 'react';
import { timelineData } from './timelineData';
import TimelineItem from './TimelineItem';

class Professional extends Component {
  render() {
    let Timeline =
        (<div className="timeline-container">
          <div className='tick'></div>
          <div className='tick'></div>
          <div className='tick'></div>
          <div className='tick'></div>
          <div className='tick'></div>
          <div className='tick'></div>
          <div className='tick'></div>
          <div className='tick'></div>
          <div className='tick'></div>
          <div className='tick'></div>
          <div className='tick'></div>
          <div className='tick'></div>
          <div className='tick'></div>
          <div className='tick'></div>
            {timelineData.map((data, key) => (
                <TimelineItem data={data} key={key} />
            ))}
        </div>);
    return (
      <div id='professional-container'>
        <h3> Employement History </h3>
        {Timeline}
      </div>
    );
  }
};

export default Professional;

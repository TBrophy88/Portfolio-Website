import React, { Component } from 'react';

class Job extends Component {
  render() {
    var accomplishments = [];
    if(this.props.accomplishments.length > 0){
      accomplishments = this.props.accomplishments.map((accomplishment, key) =>
        <li key={key}>{accomplishment}</li>
      );
    }

    return (
      <div className='job-block'>
        <div className='job-header'>
          <div className='job-title'>
            {this.props.title}
          </div>
          <div className='job-company'>
            {this.props.company}
          </div>
        </div>
        <div className='job-sub-header'>
          <div className='job-dates'>
            {this.props.dates}
          </div>
          <div className='job-location'>
            {this.props.location}
          </div>
        </div>
        <div className='job-description'>
          {this.props.description}
        </div>
        {accomplishments.length > 0 ?
          <div className='job-accomplishments'>
            <div className='job-accomplishments-header'>Notable Accomplishments</div>
            <ul>
              {accomplishments}
            </ul>
          </div>
        :
        ''}
      </div>
    );
  }
};

export default Job;

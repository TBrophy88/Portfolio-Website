import React, { Component } from 'react';

//styles
import './index.css';

import NavBar from '../NavBar';

class About extends Component {
  render() {
    return (
      <div className='page-container'>
        <NavBar />
        <div className='title-container'>
          <h3>About Tom Brophy</h3>
        </div>
      </div>
    );
  }
};

export default About;

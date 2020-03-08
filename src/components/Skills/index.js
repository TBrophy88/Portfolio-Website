import React, { Component } from 'react';

//styles
import './index.css';

import NavBar from '../NavBar';

class Skills extends Component {
  render() {
    return (
      <div className='page-container'>
        <NavBar />
        <div className='title-container'>
          <h3>Tom Brophy's Skills</h3>
        </div>
        <div className='skills-container'>
          
        </div>
      </div>
    );
  }
};

export default Skills;

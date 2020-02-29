import React, { Component } from 'react';

//styles
import './index.css';

import NavBar from '../NavBar';

class Projects extends Component {
  render() {
    return (
      <div className='page-container'>
        <NavBar />
        <div className='title-container'>
          <h3>Tom Brophy's Projects</h3>
        </div>
      </div>
    );
  }
};

export default Projects;

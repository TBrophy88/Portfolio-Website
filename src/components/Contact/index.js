import React, { Component } from 'react';

//styles
import './index.css';

import NavBar from '../NavBar';

class Contact extends Component {
  render() {
    return (
      <div className='page-container'>
        <NavBar />
        <div className='title-container'>
          <h3>Contact Tom Brophy</h3>
        </div>
      </div>
    );
  }
};

export default Contact;

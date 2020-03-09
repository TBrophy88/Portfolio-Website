import React, { Component } from 'react';

//styles
import './index.css';

import NavBar from '../NavBar';

class Contact extends Component {
  render() {
    return (
      <div className='page-container'>
        <NavBar />
        <div className='contact-container'>
          <div className='title-container'>
            <h1>Contact Tom Brophy</h1>
          </div>
          <div className='contact-content-container'>
            <div className='contact-email-container'>
              <p>The best way to contact me is by E-Mail: </p>
              <a className="social-network-link unselectable" href="mailto:t.brophy@gmail.com">
                <img
                  className="social-network-image unselectable"
                  src="https://image.flaticon.com/icons/png/512/1634/1634120.png"
                  alt="Email"
                />
              </a>
            </div>
            <div className='contact-social-networks-container'>
              <p>Or see my social network pages: </p>
              <div className='social-networks-container'>
                <a className="social-network-link unselectable" href="https://www.linkedin.com/in/tom-brophy-b8267a182">
                  <img
                    className="social-network-image unselectable"
                    src="https://image.flaticon.com/icons/svg/145/145807.svg"
                    alt="LinkedIn"
                  />
                </a>
                <a className="social-network-link unselectable" href="https://github.com/TBrophy88">
                  <img
                    className="social-network-image unselectable"
                    src="https://image.flaticon.com/icons/svg/733/733553.svg"
                    alt="GitHub"
                  />
                </a>
                <a draggable="false" className="social-network-link unselectable" href="https://stackexchange.com/users/17671305/tom-brophy">
                  <img
                    className="social-network-image unselectable"
                    src="https://image.flaticon.com/icons/svg/2111/2111628.svg"
                    alt="Stack Exchange"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Contact;

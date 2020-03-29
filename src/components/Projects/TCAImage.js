import React, { Component } from 'react';

class TCAImage extends Component {
  render() {
    return (
      <div className='tca-image-container'>
        <img
          className='tca-image'
          src={"../tca/" + this.props.src}
          alt="tca system screenshot"
        />
      </div>
    );
  }
};

export default TCAImage;

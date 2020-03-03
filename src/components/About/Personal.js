import React, { Component } from 'react';

class Personal extends Component {
  render() {
    return (
      <div id='personal-container'>
        <div className='personal-image-container'>
          <img
            id='abby'
            className='unselectable'
            src='../abby.jpg'
            alt="Abigail, my daughter"
          />
        </div>
        <div id='personal-text-container'>
          <p>I live here in China with my Chinese wife and our 1-year old daughter.  My wife runs her own company, T-SWAN, doing foreign trade of personal audio products, primarily earphones, headphones, Bluetooth products and related accessories.  My daughter mostly just walks around causing chaos in between meals and sleep.</p>
          <p>I have many hobbies I enjoy in my free time.  I love cooking and baking and can often be found searching for new recipes or new ways to use my sous vide machine.  Reading is another favorite pastime, with fantasy and science fiction novels being my preferred genres.  Gaming is another way I might kill some downtime, especially online with friends back in America.  Last but not least, I take my health seriously and therefore incorporate daily exercise into my life, whether it be running, swimming, strength training or just going for long walks.</p>
        </div>
        <div className='personal-image-container'>
          <img
            id='family'
            className='unselectable'
            src='../family.jpg'
            alt="Family"
          />
        </div>
      </div>
    );
  }
};

export default Personal;

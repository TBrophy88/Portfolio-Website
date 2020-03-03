import React, { Component } from 'react';

class Intro extends Component {
  render() {
    return (
      <div id='intro-container'>
        <div id='intro-image-container'>
          <img
            id='profile-picture'
            className='unselectable'
            src='profile pic.jpg'
            alt="Profile"
          />
        </div>
        <div id='intro-text-container'>
          <p>My name is Tom Brophy.  I am a 31-year-old U.S. Citizen from New Jersey.  For over 7 years now, I have been living in Dongguan, Guangdong, China, about one hour inland from Hong Kong.  I have worked as a remote full stack developer for the past 3 years and have developed web applications for businesses for a total of 5+ years.  I have over 9 years of experience in the IT industry in total.</p>
          <p>I am a motivated, fast learner who likes to stay on top of the latest technology trends and apply them to my projects in ways that create value for my clients.  I love taking responsibility and ownership of my work and tackling challenging problems.  I am a clear communicator who works well with others and enjoys team collaboration, but I also work efficiently on my own.</p>
        </div>
      </div>
    );
  }
};

export default Intro;

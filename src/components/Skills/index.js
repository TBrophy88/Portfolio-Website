import React, { Component } from 'react';
import { skillsData } from './skillsData';

//styles
import './index.css';

import NavBar from '../NavBar';
import Skill from './Skill';

class Skills extends Component {
  render() {
    let SkillsContainerComponent = (
      <div className="skills-content-container">
        {skillsData.map((data, key) => (
          <div className='category-container' key={key}>
            <div className='category-title' key={key}>
              <h3>{data.category}</h3>
              <div className='category-tick'></div>
              <div className='category-tick'></div>
              <div className='category-main-tick'></div>
            </div>
            <div className='category-skills-container'>
              {data.skills.map((data, key) => (
                <Skill data={data} key={key} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );

    let styleYes = {
      backgroundColor: '#3BBA9C'
    };
    let styleNo = {
      backgroundColor: '#43455C'
    };

    return (
      <div className='page-container'>
        <NavBar />
        <div className='skills-container'>
          <div className='title-container'>
            <h1>Tom Brophy's Skills</h1>
          </div>
          {SkillsContainerComponent}
        </div>
      </div>
    );
  }
};

export default Skills;

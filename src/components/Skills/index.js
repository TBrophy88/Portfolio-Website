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
          <div className='legend-container'>
            <h3>Legend</h3>
            <div className='skill'>
              <div className = 'skill-level-container'>
                <div className='skill-point' style={styleYes}></div>
                <div className='skill-point' style={styleNo}></div>
                <div className='skill-point' style={styleNo}></div>
                <div className='skill-point' style={styleNo}></div>
                <div className='skill-point' style={styleNo}></div>
              </div>
              <div className='legend-description'><strong>Cursory Knowledge</strong> read about it somewhere and understand how it works but limited/no experience using it</div>
            </div>
            <div className='skill'>
              <div className = 'skill-level-container'>
                <div className='skill-point' style={styleYes}></div>
                <div className='skill-point' style={styleYes}></div>
                <div className='skill-point' style={styleNo}></div>
                <div className='skill-point' style={styleNo}></div>
                <div className='skill-point' style={styleNo}></div>
              </div>
              <div className='legend-description'><strong>Basic Proficiency</strong> have some experience using the technology and good understanding of fundamental principals.  Would take some time to achieve Professional Expertise</div>
            </div>
            <div className='skill'>
              <div className = 'skill-level-container'>
                <div className='skill-point' style={styleYes}></div>
                <div className='skill-point' style={styleYes}></div>
                <div className='skill-point' style={styleYes}></div>
                <div className='skill-point' style={styleNo}></div>
                <div className='skill-point' style={styleNo}></div>
              </div>
              <div className='legend-description'><strong>Proficient</strong> considerable understanding of technology, knowledge of nuances, but either a lack of professional experience or a significant period of time since I last used the technology.  Could quickly reach Professional Expertise</div>
            </div>
            <div className='skill'>
              <div className = 'skill-level-container'>
                <div className='skill-point' style={styleYes}></div>
                <div className='skill-point' style={styleYes}></div>
                <div className='skill-point' style={styleYes}></div>
                <div className='skill-point' style={styleYes}></div>
                <div className='skill-point' style={styleNo}></div>
              </div>
              <div className='legend-description'><strong>Professional Expertise</strong> full understanding of technology, recent and significant professional experience using it.  Could use in a professional setting immediately including providing instruction or help to other developers.</div>
            </div>
            <div className='skill'>
              <div className = 'skill-level-container'>
                <div className='skill-point' style={styleYes}></div>
                <div className='skill-point' style={styleYes}></div>
                <div className='skill-point' style={styleYes}></div>
                <div className='skill-point' style={styleYes}></div>
                <div className='skill-point' style={styleYes}></div>
              </div>
              <div className='legend-description'><strong>Industry Leader</strong>  A founder, creator or contributor of the technology.  Could give lectures or talks to the general public on the topic.  Able to fix bugs or expand features in the technology itself.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Skills;

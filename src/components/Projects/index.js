import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch,
  withRouter
} from 'react-router-dom';

//styles
import './index.css';

import NavBar from '../NavBar';
import TCA from './TCA';

class Projects extends Component {
  render() {
    let { path, url } = this.props.match;

    return (
      <div className='page-container'>
        <NavBar />
        <Switch>
          <Route exact path={path}>
            <div className='projects-container'>
              <div className='title-container'>
                <h1>Tom Brophy's Projects</h1>
              </div>
              <div className='projects-content-container'>
                <div className='project' id='website'>
                  <div className='project-image-container'>
                    <img
                      id='website'
                      className='unselectable project-picture'
                      src='website.jpg'
                      alt="Website"
                    />
                  </div>
                  <div className='project-text-container'>
                    <p>This is my portfolio website (that you are on right now).  It features a particle system on the home page with state fully managed via redux.  This enables a relatively simple implementation of 'time-control' which can undo do all particle movements, death, creation, and changes in controls state (quantity, velocity and gravity).  The code is fully available on my GitHub <a href='https://github.com/TBrophy88/Portfolio-Website'>here.</a></p>
                  </div>
                </div>
                <div className='project' id='TCA'>
                  <div className='project-image-container'>
                    <Link exact to={`${url}/tca`} className='unselectable'>
                      <img
                        id='tca'
                        className='unselectable project-picture'
                        src='./tca/Dashboard thumb.JPG'
                        alt="TCA's ERP System"
                      />
                    </Link>
                  </div>
                  <div className='project-text-container'>
                    <p>TCA is a manufacturing company in China.  I developed their propritary ERP system for 3 years, accomidating their dynamic business needs and expanding functionality to reduce workloads.  It is built on a LAMP stack, uses Laravel framework and bootstrap for styling.  Censored images published with the permission of The Cable Assembler Ltd.  Click on the thumbnail for more screenshots or click <Link exact to={`${url}/tca`}>here.</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </Route>
          <Route path={`${path}/tca`}>
            <TCA />
          </Route>
        </Switch>
      </div>
    );
  }
};

export default withRouter(Projects);

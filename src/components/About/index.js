import React, { Component } from 'react';

import {
  Route,
  NavLink,
  Switch,
  withRouter
} from 'react-router-dom';

import NavBar from '../NavBar';
import Intro from './Intro';
import Professional from './Professional';
import Personal from './Personal';

//styles
import './index.css';

class About extends Component {
  render() {
    let { path, url } = this.props.match;

    return (
      <div className='page-container'>
        <NavBar />
        <div id='about-container'>
          <div className='title-container'>
            <h1>About Tom Brophy</h1>
          </div>
          <div id='about-content-container'>
            <div id='about-nav-container'>
              <NavLink exact to={`${url}`} className='unselectable'>Introduction</NavLink>
              <NavLink exact to={`${url}/professional`} className='unselectable'>Professional</NavLink>
              <NavLink exact to={`${url}/personal`} className='unselectable'>Personal</NavLink>
            </div>
            <Switch>
              <Route exact path={path}>
                <Intro />
              </Route>
              <Route path={`${path}/professional`}>
                <Professional />
              </Route>
              <Route path={`${path}/personal`}>
                <Personal />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(About);

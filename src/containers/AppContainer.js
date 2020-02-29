import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import App from '../components';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

class AppContainer extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/About'>
            <About />
          </Route>
          <Route path='/Skills'>
            <Skills />
          </Route>
          <Route path='/Projects'>
            <Projects />
          </Route>
          <Route path='/Contact'>
            <Contact />
          </Route>
          <Route path='/'>
            <App/>
          </Route>
        </Switch>
      </Router>
    );
  }
};

export default AppContainer;

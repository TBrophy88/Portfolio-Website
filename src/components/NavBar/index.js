import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

//styles
import './index.css';

class NavBar extends Component {
  render() {
    return (
      <div className="menu">
        <ul>
          <li><NavLink to="/" className="unselectable">Home</NavLink></li>
          <li><NavLink to="/about" className="unselectable">About</NavLink></li>
          <li><NavLink to="/skills" className="unselectable">Skills</NavLink></li>
          <li><NavLink to="/projects" className="unselectable">Projects</NavLink></li>
          <li><NavLink to="/contact" className="unselectable">Contact</NavLink></li>
        </ul>
      </div>
    );
  }
};

export default NavBar;

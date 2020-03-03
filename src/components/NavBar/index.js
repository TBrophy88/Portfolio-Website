import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

//styles
import './index.css';

class NavBar extends Component {
  render() {
    return (
      <div className="menu">
        <ul>
          <li><NavLink exact to="/" className="unselectable">Home</NavLink></li>
          <li><NavLink exact to="/about" className="unselectable">About</NavLink></li>
          <li><NavLink exact to="/skills" className="unselectable">Skills</NavLink></li>
          <li><NavLink exact to="/projects" className="unselectable">Projects</NavLink></li>
          <li><NavLink exact to="/contact" className="unselectable">Contact</NavLink></li>
        </ul>
      </div>
    );
  }
};

export default NavBar;

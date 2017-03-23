import React, { Component } from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import logo from 'img/logo.svg';
import 'scss/master.scss';

class IndexPage extends Component {
  render() {
    return (
        <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to React</h2>
            </div>
            <div className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
              <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/list">list</Link></li>
                <li><Link to="/detail">detail</Link></li>
              </ul>
            </div>
        </div>
    );
  }
}

export default IndexPage;

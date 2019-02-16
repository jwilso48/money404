import React, { Component } from 'react';
// import logo from './static/logo.svg';
import './static/App.css';
import ActionsBox from './components/ActionsBox';
import GraphBox from './components/GraphBox';
import avi from './static/avi.jpg';
import StatsBox from './components/StatsBox';

class App extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <div className="title">
            <h1>Money404</h1>
          </div>
          {/* shows the name and avi of the user */}
          <div className="nametag">
            <h3>Alice User</h3>
            <img src={avi} alt="avi" id="avi" />
          </div>
        </header>
        <ActionsBox className="actions-box" />
        <StatsBox className="stats-box" />
        <GraphBox className="graph-box" />
      </div>
    );
  }
}

export default App;

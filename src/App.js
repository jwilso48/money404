import React, { Component } from 'react';
// import logo from './static/logo.svg';
import './static/App.css';
import ActionsBox from './components/ActionsBox';
import GraphBox from './components/GraphBox';
import avi from './static/avi.jpg';
import StatsBox from './components/StatsBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        first_name: "Fatimah",
        last_name: "Warner"
      }
    };
  }
  render() {
    return (
      <div className="container">
        <div className="title">
          <h1 id="title">Money404</h1>
        </div>
        {/* shows the name and avi of the user */}
        <div className="nametag">
          <h1 id="user-name">{this.state.customer.first_name} {this.state.customer.last_name}</h1>
          <img width="10px" />
          <img src={avi} alt="avi" id="avi" />
        </div>
        <ActionsBox className="actions-box" />
        <StatsBox className="stats-box" />
        <GraphBox className="graph-box" />
      </div>
    );
  }
}

export default App;

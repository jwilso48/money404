import React, { Component } from 'react';
import '../static/StatsBox.css';

class StatsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checking: 0,
      savings: 0,
      debt: 0,
      actions: [
        { name: "Coffee", cost: -5 }
      ]};
  }

  componentDidMount() {
    // assign values to state fields (i.e., account amounts)
  }

  render() {
    return (
      <div className="StatsBox">
        <h1>Finances</h1>
        <div id="Finances">
          <p>Checking: {this.state.checking}</p>
          <p>Savings: {this.state.savings}</p>
          <p>Debt: {this.state.debt}</p>
        </div>
        <div id="RecentActions">
          <p>{this.state.actions[0].name}: ${this.state.actions[0].cost}</p>
        </div>
      </div>
    );
  }
}

export default StatsBox;
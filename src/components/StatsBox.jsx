import React, { Component } from "react";
import "../static/StatsBox.css";
import { getTransactionsByDay } from "../TransactionsByDay";

class StatsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checking: 0,
      savings: 0,
      debt: 0,
      actions: [{ name: "Coffee", cost: -5 }]
    };
  }

  calculateDebt(actions) {
    let debt = 0;
    actions.forEach(action => {
      console.log(action);
      if (action.name === "loan") {
        debt += action.cost;
      }
    });
    this.setState({ debt: debt });
  }

  formatCurrency(cents) {
    if (cents < 0) {
      return "-$" + cents / -100.0;
    }
    return "$" + cents / 100.0;
  }

  componentDidMount() {
    this.props.accounts.forEach(account => {
      if (account.account.type === "Savings") {
        this.setState({ savings: account.account.balance });
      } else {
        this.setState({ checking: account.account.balance });
      }
    });
    let actions = getTransactionsByDay(this.props);
    this.setState({ actions: actions });
    console.log(this.state);
    this.calculateDebt(actions);
  }

  render() {
    const actions = this.state.actions.map((action, index) => {
      return (
        <li key={index}>
          {action.name}: {this.formatCurrency(action.cost)}
        </li>
      );
    });
    return (
      <div className="StatsBox">
        <h1>Finances and Recent Actions</h1>
        <div className="finances-and-recent-actions">
          <div id="Finances">
            <p>Checking: {this.formatCurrency(this.state.checking)}</p>
            <p>Savings: {this.formatCurrency(this.state.savings)}</p>
            <p>Debt: {this.formatCurrency(this.state.debt)}</p>
          </div>
          <div id="RecentActions">
            <ul>{actions}</ul>
          </div>
        </div>
     </div>
    );
  }
}

export default StatsBox;

import React, { Component } from 'react';
import '../static/ActionsBox.css'
import { getTransactionsByDay } from "../TransactionsByDay";

class ActionsBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: "spend",
      recentActions: [],
      actions: {
        spend: [],
        save: [],
        borrow: [
          { name: "Take out a payday loan", cost: -500 },
          { name: "Neglect to pay off your student loans", cost: -500}
        ],
        invest: [
          { name: "Invest in an untested cryptocurrency", cost: -300},
          { name: "Purchase random stocks on Robinhood", cost: -500}
        ]
      }
    }

    // this.props.actions = {
    //   spend: [],
    //   save: [],
    //   borrow: [
    //     { name: "Take out a payday loan", cost: -500 },
    //     { name: "Neglect to pay off your student loans", cost: -500}
    //   ],
    //   invest: [
    //     { name: "Invest in an untested cryptocurrency", cost: -300},
    //     { name: "Purchase random stocks on Robinhood", cost: -500}
    //   ]
    // };
  }

  componentDidMount() {
    this.props.accounts.forEach(account => {
      if (account.account.type === "Savings") {
        this.setState({ savings: account.account.balance });
      } else {
        this.setState({ checking: account.account.balance });
      }
    });
    let spendActions = getTransactionsByDay(this.props);
    // this.state.actions.spend = spendActions;
    this.setState({ actions: { spend: spendActions } });
    console.log(this.state);
  }

  formatCurrency(cents) {
    if (cents < 0) {
      return "-$" + cents / -100.0;
    }
    return "$" + cents / 100.0;
  }

  handleClick(id) {
    console.log("clicked on " + id);
    this.setState({ currentTab: id });
  }

  render() {
    const actions = this.state.actions.spend.map((action, index) => {
      return (
        <li key={index}>
          {action.name}: {this.formatCurrency(action.cost)}
        </li>
      );
    });
    return (
      <div className="actions-box">
        <ul className="tab-bar">
          <li><a href="#" id="tab-spend" onClick={() => this.handleClick("spend")}>Spend</a></li>
          <li><a href="#" id="tab-save" onClick={() => this.handleClick("save")}>Save</a></li>
          <li><a href="#" id="tab-borrow" onClick={() => this.handleClick("borrow")}>Borrow</a></li>
          <li><a href="#" id="tab-invest" onClick={() => this.handleClick("invest")}>Invest</a></li>
        </ul>
        <div id="actions-list">
          <ul>{actions}</ul>
        </div>
      </div>
    );
  }
}

export default ActionsBox;
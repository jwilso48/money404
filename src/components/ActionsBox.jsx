import React, { Component } from "react";
import "../static/ActionsBox.css";
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
          { name: "Take out a payday loan", cost: -50000 },
          { name: "Neglect to pay off your student loans", cost: -50000 }
        ],
        invest: [
          { name: "Invest in an untested cryptocurrency", cost: -30000 },
          { name: "Purchase random stocks on Robinhood", cost: -50000 }
        ]
      }
    };
  }

  componentDidMount() {
    let actions = getTransactionsByDay(this.props);
    let spendActions = [];
    let saveActions = [];
    actions.forEach(action => {
      if (action.cost < 0) {
        spendActions.push(action);
      } else {
        saveActions.push(action);
      }
    });
    this.setState({
      actions: {
        spend: spendActions,
        save: saveActions,
        borrow: this.state.actions.borrow,
        invest: this.state.actions.invest
      }
    });
  }

  formatCurrency(cents) {
    if (cents < 0) {
      return "-$" + cents / -100.0;
    }
    return "$" + cents / 100.0;
  }

  handleClick(id) {
    this.setState({ currentTab: id });
  }

  renderActions(actions) {
    return actions.map((action, index) => {
      return (
        <li key={index}>
          {action.name}: {this.formatCurrency(action.cost)}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="actions-box">
        <ul className="tab-bar">
          <li>
            <a
              href="#"
              id="tab-spend"
              onClick={() => this.handleClick("spend")}
            >
              Spend
            </a>
          </li>
          <li>
            <a href="#" id="tab-save" onClick={() => this.handleClick("save")}>
              Save
            </a>
          </li>
          <li>
            <a
              href="#"
              id="tab-borrow"
              onClick={() => this.handleClick("borrow")}
            >
              Borrow
            </a>
          </li>
          <li>
            <a
              href="#"
              id="tab-invest"
              onClick={() => this.handleClick("invest")}
            >
              Invest
            </a>
          </li>
        </ul>
        <div id="actions-list">
          <ul>
            {this.renderActions(this.state.actions[this.state.currentTab])}
          </ul>
        </div>
      </div>
    );
  }
}

export default ActionsBox;

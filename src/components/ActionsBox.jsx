import React, { Component } from 'react';
import '../static/ActionsBox.css'
import { getTransactionsByDay } from "../TransactionsByDay";

class ActionsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "spend",
      actions: []
    }
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
  }

  formatCurrency(cents) {
    if (cents < 0) {
      return "-$" + cents / -100.0;
    }
    return "$" + cents / 100.0;
  }

  handleClick() {
    console.log("click!");
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
      <div className="actions-box">
        <div className="tab-bar">
          <h3 className="tab" id="spend" onClick={this.handleClick()}>
            Spend
          </h3>
          <h3 className="tab" id="save" onClick={this.handleClick()}>
            Save
          </h3>
          <h3 className="tab" id="borrow" onClick={this.handleClick()}>
            Borrow
          </h3>
          <h3 className="tab" id="invest" onClick={this.handleClick(this.id)}>
            Invest
          </h3>
        </div>
        <div id="actions-list">
          <ul>{actions}</ul>
        </div>
      </div>
    );
  }
}

// class ActionsList extends Component {
//   componentDidMount() {
//     this.props.accounts.forEach(account => {
//       if (account.account.type === "Savings") {
//         this.setState({ savings: account.account.balance });
//       } else {
//         this.setState({ checking: account.account.balance });
//       }
//     });
//     let actions = getTransactionsByDay(this.props);
//     this.setState({ actions: actions });
//     console.log(this.state);
//     this.calculateDebt(actions);
//   }

//   render() {
//     const actions = this.state.actions.map((action, index) => {
//       return (
//         <li key={index}>
//           {action.name}: {this.formatCurrency(action.cost)}
//         </li>
//       );
//     });
//     return (
//       <div id="RecentActions">
//         <ul>{actions}</ul>
//       </div>
//     );
//   }
// }
// class ActionsBox extends Component {
//   render() {
//     return (
//       <div className="ActionsBox">
//         <TabBar />
//         <ActionsList />
//       </div>
//     );
//   }
// }

export default ActionsBox;
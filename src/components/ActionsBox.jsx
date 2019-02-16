import React, { Component } from 'react';

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: "spend" }
  }

  handleClick(tabId) {
    this.setState(state => ({
      selected: tabId
    }));
  }

  render() {
    return (
      <div className="TabBar">
        <h3 className="tab" id="spend" onClick={this.handleClick(this.id)}>
          Spend
        </h3>
        <h3 className="tab" id="save" onClick={this.handleClick(this.id)}>
          Save
        </h3>
        <h3 className="tab" id="borrow" onClick={this.handleClick(this.id)}>
          Borrow
        </h3>
        <h3 className="tab" id="invest" onClick={this.handleClick(this.id)}>
          Invest
        </h3>
      </div>
    );
  }
}

class Action extends Component {
  render() {
    return (
      <ul>
        <li>yeet</li>
      </ul>
    );
  }
}

class ActionsList extends Component {
  render() {
    return (
      null
    );
  }
}
class ActionsBox extends Component {
  render() {
    return (
      <div className="ActionsBox">
        <TabBar />
        <ActionsList />
      </div>
    );
  }
}

export default ActionsBox;
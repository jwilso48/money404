import React, { Component } from 'react';
import '../static/ActionsBox.css'

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: "spend" }
  }

  handleClick() {
    // this.setState((e) => ({
    //   selected: e.id
    // }));
  }

  render() {
    return (
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
      <img src="http://lorempixel.com/400/800/" alt="graph lol" width="400px" height="400px"></img>
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
import React, { Component } from "react";
// import logo from './static/logo.svg';
import "./static/App.css";
import ActionsBox from "./components/ActionsBox";
import GraphBox from "./components/GraphBox";
import avi from "./static/avi.jpg";
import StatsBox from "./components/StatsBox";
import { getCustomerDataById } from "./CapitalOneAPI";
import { seedTestData } from "./seedTestData";
import { ClipLoader } from "react-spinners";
import { getGraphData } from "./graphData";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        first_name: "Johnny",
        last_name: "Test"
      },
      accounts: [],
      is_loading: true,
      projection_hist: []
    };
  }

  componentDidMount() {
    seedTestData((err, id) => {
      getCustomerDataById(id, (err, customerData) => {
        this.setState({
          customer: {
            first_name: customerData.customer.first_name,
            last_name: customerData.customer.last_name
          },
          accounts: customerData.accounts,
          is_loading: false,
          projection_hist: [getGraphData(customerData)]
        });
      });
    });
  }

  render() {
    if (this.state.is_loading) {
      return <ClipLoader />;
    }
    return (
      <div className="container">
        <div className="title">
          <h1 id="title"> Money404 </h1>{" "}
        </div>{" "}
        {/* shows the name and avi of the user */}{" "}
        <div className="nametag">
          <h1 id="user-name">
            {" "}
            {this.state.customer.first_name} {this.state.customer.last_name}{" "}
          </h1>{" "}
          <img width="10px" />
          <img src={avi} alt="avi" id="avi" />
        </div>{" "}
        <ActionsBox className="actions-box" accounts={this.state.accounts} />{" "}
        <StatsBox className="stats-box" accounts={this.state.accounts} />{" "}
        <GraphBox
          className="graph-box"
          graphData={this.state.projection_hist[0]}
        />{" "}
      </div>
    );
  }
}

export default App;

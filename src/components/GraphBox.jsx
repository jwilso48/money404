import React, { Component } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { getGraphData } from "../graphData";

const data = [
  { date: new Date("2-1-19"), assets: 34167, debts: 43266 },
  { date: new Date("2-2-19"), assets: 51908, debts: 37907 },
  { date: new Date("2-3-19"), assets: 44441, debts: 34563 },
  { date: new Date("2-4-19"), assets: 46134, debts: 33124 },
  { date: new Date("2-5-19"), assets: 41329, debts: 39001 },
  { date: new Date("2-6-19"), assets: 45823, debts: 32563 },
  { date: new Date("2-7-19"), assets: 51574, debts: 36589 },
  { date: new Date("2-8-19"), assets: 49823, debts: 35123 }
];

class GraphBox extends Component {
  render() {
    return (
      <div className="graph-box">
        <LineChart width={400} height={300} data={getGraphData(this.props)}>
          <Line type="monotone" dataKey="assets" stroke="#8884d8" />
          <Line type="monotone" dataKey="debts" stroke="#DC143C" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
        </LineChart>
      </div>
    );
  }
}

export default GraphBox;

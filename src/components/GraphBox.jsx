import React, { Component } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";

// const data = [
//   { date: new Date("2-1-19"), assets: 34167, debts: 43266 },
//   { date: new Date("2-2-19"), assets: 51908, debts: 37907 },
//   { date: new Date("2-3-19"), assets: 44441, debts: 34563 },
//   { date: new Date("2-4-19"), assets: 46134, debts: 33124 },
//   { date: new Date("2-5-19"), assets: 41329, debts: 39001 },
//   { date: new Date("2-6-19"), assets: 45823, debts: 32563 },
//   { date: new Date("2-7-19"), assets: 51574, debts: 36589 },
//   { date: new Date("2-8-19"), assets: 49823, debts: 35123 }
// ];

class GraphBox extends Component {
  formatCurrency(cents) {
    if (cents < 0) {
      return "-$" + cents / -100.0;
    }
    return "$" + cents / 100.0;
  }

  render() {
    return (
      <div className="graph-box">
        <ResponsiveContainer height="100%" width="90%">
          <LineChart data={this.props.graphData}>
            <Line type="monotone" dataKey="assets" stroke="#8884d8" />
            <Line type="monotone" dataKey="debts" stroke="#DC143C" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={this.formatCurrency} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default GraphBox;

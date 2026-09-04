/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-04 10:03:18
 * @LastEditTime: 2026-09-04 10:03:18
 * @LastEditors: lizhiliang
 * @Usage:
 */

import { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;

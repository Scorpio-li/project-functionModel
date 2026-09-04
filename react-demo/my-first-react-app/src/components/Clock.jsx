/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-04 10:11:35
 * @LastEditTime: 2026-09-04 10:27:45
 * @LastEditors: lizhiliang
 * @Usage:
 */
import { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>现在是 {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

export default Clock;

import { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { data: 0 };
    this.setNewNumber = this.setNewNumber.bind(this);
  }

  setNewNumber() {
    this.setState({ data: this.state.data + 1 });
  }

  render() {
    return (
      <div>
        <button onClick={this.setNewNumber}>INCREMENT</button>
        <Content myNumber={this.state.data} />
      </div>
    );
  }
}

class Content extends Component {
  componentDidMount() {
    console.log("Component DID MOUNT!");
  }

  shouldComponentUpdate(newProps, newState) {
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component DID UPDATE!");
  }

  componentWillUnmount() {
    console.log("Component WILL UNMOUNT!");
  }

  render() {
    return (
      <div>
        <h3>{this.props.myNumber}</h3>
      </div>
    );
  }
}

//   const root = ReactDOM.createRoot(document.getElementById("root"));
//   root.render(
//     <div>
//       <Button />
//     </div>
//   );

export default Button;

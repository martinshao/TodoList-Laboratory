import React from 'react';

class SubCounter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      number: this.props.number
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // return prevState;
    console.info('getDerivedStateFromProps------sub nextProps, prevState', nextProps, prevState)
    return nextProps
  }

  render() {
    return (
      <p>props.number: {this.props.number} - state.number{this.state.number}</p>
    )
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    }
  }
  countUp = () => {
    const { number } = this.state;
    this.setState({ number: number + 1 });
  }

  countDown = () => {
    const { number } = this.state;
    this.setState({ number: number - 1 });
  }

  render() {
    return (
      <div className="container">
        <p>{this.state.number}</p>
        <button onClick={this.countUp}>+</button>
        <button onClick={this.countDown}>-</button>
        {this.state.number < 10 ? <SubCounter number={this.state.number} /> : null}
      </div>
    )
  }
}

export default Counter;

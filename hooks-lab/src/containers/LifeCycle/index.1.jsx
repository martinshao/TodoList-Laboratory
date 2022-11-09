import React from 'react';

class SubCounter extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor-----------------sub', '11、子组件构造器');
    this.state = {
      number: this.props.number,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ number: nextProps.number });
    this.setState({ number: nextProps.number + 1 });
    this.setState({ number: nextProps.number + 2 });
    console.info('sub', nextProps);
    console.log(
      'componentWillReceiveProps---sub',
      '12、子组件将要接收到新属性'
    );
  }

  componentWillMount() {
    console.log('componentWillMount----------sub', '13、子组件挂载之前');
  }

  componentDidMount() {
    console.log('componentDidMount-----------sub', '17、子组件挂载完成');
    console.log(
      '%c-------------------------------------------------------',
      'color:red'
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate-------sub', '14、子组件是否需要更新');
    console.log(
      'shouldComponentUpdate-------sub nextProps, nextState',
      nextProps,
      nextState
    );
    if (nextProps.number < 5) return true;
    return false;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate---------sub', '15、子组件将要更新');
    console.log(
      'componentWillUpdate---------sub nextProps, nextState',
      nextProps,
      nextState
    );
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate----------sub', '18、子组件更新完成');
    console.log(
      'componentDidUpdate----------sub prevProps, prevState',
      prevProps,
      prevState
    );
  }

  componentWillUnmount() {
    console.log('componentWillUnmount---sub', '19、子组件将卸载');
  }

  render() {
    console.log('render----------------------sub', '16、子组件挂载中');
    console.log(
      '%c-------------------------------------------------------',
      'color:skyblue'
    );
    return (
      <p>
        props.number: {this.props.number} - state.number: {this.state.number}
      </p>
    );
  }
}

class Counter extends React.Component {
  static defaultProps = {
    //1、加载默认属性
    name: 'sls',
    age: 23,
  };

  constructor(props) {
    super(props);
    //2、加载默认状态
    this.state = {
      number: 0,
    };
    console.log('constructor-----------------counter', '1、父组件构造器');
    // this.test = this.test.bind(this);
  }

  componentWillMount() {
    console.log('componentWillMount----------counter', '3、父组件挂载之前');
  }

  componentDidMount() {
    console.log('componentDidMount-----------counter', '7、父组件挂载完成');
    console.log(
      '%c-------------------------------------------------------',
      'color:red'
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate-------counter', '4、父组件是否需要更新');
    if (nextState.number < 15) return true;
    return false;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate---------counter', '5、父组件将要更新');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate----------counter', '8、父组件更新完成');
  }

  handleClick = () => {
    const { number } = this.state;
    this.setState({
      number: number + 1,
    });
  };

  render() {
    console.log('render----------------------counter', '6、render(父组件挂载)');
    console.log(
      '%c-------------------------------------------------------',
      'color:yellow'
    );
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
        {this.state.number < 10 ? (
          <SubCounter number={this.state.number} />
        ) : null}
      </div>
    );
  }
}

export default Counter;

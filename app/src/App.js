import React, { Component } from 'react';

const CONTRACT_ADDRESS = ''
const ABI = ''

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      balance: 0
    }
  }

  render() {
    return (
      <div>Hello humans</div>
    )
  }
}

export default App;

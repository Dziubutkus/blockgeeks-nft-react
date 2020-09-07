import React, { Component } from 'react';
import { Segment, Button, Form } from 'semantic-ui-react'

class AttackVirus extends Component {
  constructor(props) {
    super(props)
    this.state = {
        myVirusID: 0,
        enemyVirusID: 0,
        text: '',
        color: '',
        display: 'none'
    }
  }

  handleMyIDChange(event) {
    this.setState({ myVirusID: event.target.value })
  }

  handleEnemyIDChange(event) {
    this.setState({ enemyVirusID: event.target.value })
  }

  async handleForm(event) {
    // listen for Winner()
    // virusContract.methods.infect()...
    var winner
    this.props.virusContract.once('Winner', function(error, event) {
        winner = event.returnValues.tokenId
    })
    await this.props.virusContract.methods.infect(this.state.myVirusID, this.state.enemyVirusID).send({ from: this.props.account })
    this.displayWinner(winner)
  }

  displayWinner(tokenId) {
      var text
      var color
      if(tokenId === this.state.myVirusID) {
        text = 'You defeated the enemy!'
        color = 'ui green message'
      }
      else {
        text = 'You LOST!'
        color = 'ui red message'
      }
      this.setState({ text, color, display: '' })
  }

  render() {
    return (
        <Segment>
            <div style={{ display: this.state.display }} className={this.state.color}>{this.state.text}</div>
            <Form onSubmit={(e) => {this.handleForm(e)}}>
                <Form.Field>
                    <label>Your Virus ID</label>
                    <input placeholder="Enter your virus ID" onChange={(e) => {this.handleMyIDChange(e)}} />
                </Form.Field>
                <Form.Field>
                    <label>Enemy Virus ID</label>
                    <input placeholder="Enter enemy virus ID" onChange={(e) => {this.handleEnemyIDChange(e)}} />
                </Form.Field>
                <Button negative type='submit'>ATTACK!</Button>
            </Form>
        </Segment>
    )
  }
}

export default AttackVirus;

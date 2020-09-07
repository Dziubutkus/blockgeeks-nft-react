import React, { Component } from 'react';
import { Segment, Button, Form } from 'semantic-ui-react'

class Transfer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myVirusID: '',
      recipientAddress: '',
      text: '',
      display: 'none'
    }
  } 

  handleMyIDChange(event) {
    this.setState({ myVirusID: event.target.value })
  }

  handleAddressChange(event) {
    this.setState({ recipientAddress: event.target.value })
  }

  async handleForm(event) {
    await this.props.virusContract.methods.safeTransferFrom(this.props.account, this.state.recipientAddress, this.state.myVirusID).send({ from: this.props.account })
    this.displayNotification()
  }

  displayNotification() {
    let text = 'You transfered your token to ' + this.state.recipientAddress
    this.setState({ text, display: '' })
  }

  render() {
    return (
        <Segment>
            <div style={{ display: this.state.display }} className="ui message green">{this.state.text}</div>
            <Form onSubmit={(e) => {this.handleForm(e)}}>
                <Form.Field>
                    <label>Your Virus ID</label>
                    <input placeholder="Enter your virus ID" onChange={(e) => {this.handleMyIDChange(e)}} />
                </Form.Field>
                <Form.Field>
                    <label>Reciepient's Address</label>
                    <input placeholder="Enter recipient's address" onChange={(e) => {this.handleAddressChange(e)}} />
                </Form.Field>
                <Button primary type='submit'>Transfer</Button>
            </Form>
        </Segment>
    )
  }
}

export default Transfer;

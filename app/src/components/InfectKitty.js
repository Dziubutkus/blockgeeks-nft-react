import React, { Component } from 'react';
import { Segment, Button, Form } from 'semantic-ui-react'

class InfectKitty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myVirusID: '',
      text: '',
      display: 'none'
    }
  } 

  async componentDidMount() {
    let url = "https://api.cryptokitties.co/kitties/" + 
      Math.floor(Math.random() * 10000) + 1
    const res = await fetch(url)
    const kitty = await res.json()
    this.setState({
      image: kitty.image_url
    })
  }

  handleMyIDChange(event) {
    this.setState({ myVirusID: event.target.value })
  }

  async handleForm(event) {
    let randomId = Math.floor(Math.random() * 10000) + 1
    await this.props.virusContract.methods.infectKitty(this.state.myVirusID, randomId).send({ from: this.props.account })
    this.displayNotification()
  }

  displayNotification() {
    let text = 'You infected a cryptoKitty! Refresh the page to see if you won a new Virus!'
    this.setState({ text, display: '' })
  }

  render() {
    return (
        <Segment>
            <div style={{ display: this.state.display }} className="ui message green">{this.state.text}</div>
            <Form onSubmit={(e) => {this.handleForm(e)}}>
              <img src={this.state.image} width="200px" alt="Virus victim" />
                <Form.Field>
                    <label>Your Virus ID</label>
                    <input placeholder="Enter your virus ID" onChange={(e) => {this.handleMyIDChange(e)}} />
                </Form.Field>
                <Button negative type='submit'>INFECT!</Button>
            </Form>
        </Segment>
    )
  }
}

export default InfectKitty;

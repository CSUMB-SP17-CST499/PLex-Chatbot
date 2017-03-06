// Main React.js component

import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import axios from 'axios'
import './style.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.props.messages = []
    this.state = {text: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  // Updating this.state.text variable as user types
  handleChange(event) {
    this.setState({text: event.target.value}, function() {
      console.log(this.state.text)
    })
  }

  // Send post request to chatbot containing the user's request
  // contained in parameter 'intent'
  handleClick(event) {
    axios.post('http://localhost:8080/api/user/item', {
      intent: this.state.text
    }).then(function (res) {
      console.log(res.data.result.fulfillment.messages)
    }).catch(function (error) {
      console.log(error)
    })
  }

  render() {
    const {className, ...props} = this.props
    return (
      <div className={classnames('App', className)} {...props}>
        <div className="App-header">
          <h2>Welcome to Panafold Chatbot!</h2>
        </div>

        <br />

        <input placeholder='Enter your request' value={this.state.text} onChange={this.handleChange} />
        <button onClick={this.handleClick}>Submit </button>

      </div>
    );
  }
}

export default App

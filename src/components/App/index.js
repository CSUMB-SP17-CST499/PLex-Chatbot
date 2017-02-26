// Main React.js component

import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import './style.css'

class App extends Component {
  render() {
    const {className, ...props} = this.props
    return (
      <div className={classnames('App', className)} {...props}>
        <div className="App-header">
          <h2>Welcome to Panafold Chatbot!</h2>
        </div>
      </div>
    );
  }
}

export default App

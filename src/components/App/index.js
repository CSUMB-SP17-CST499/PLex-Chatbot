// Main React.js component

import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import './style.css';
import {Chat} from '../Chat/chat';
import {Notebook} from '../Notebook/notebook';

class App extends Component {
  constructor(props) {
    super(props)

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  // This is needed for the component to render properly
  componentDidMount(){

  }

  render() {
    const {className, ...props} = this.props
    return (
      <div className={classnames('App', className)} {...props}>
        <div className="App-header">
          <h2>Welcome to Panafold Chatbot!</h2>
        </div>

        <br />
        <Notebook />
        <Chat />

      </div>
    );
  }
}

export default App

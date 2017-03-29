import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import './style.css';
import axios from 'axios';


export class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            'text' : '',
            'conversation': [{
              'class' : '',
              'message' : ''
            }]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    };

    // Updating this.state.text variable as user types
  handleChange(event) {
    this.setState({text: event.target.value}, function() {
      console.log(this.state.text)
    })
  }

  // Send post request to chatbot containing the user's request
  // contained in parameter 'intent'
  handleSubmit(event) {
    this.state.conversation.push({'class' : 'user', 'message' : this.state.text})
    this.setState({'text': ''});

    axios.post('http://localhost:8080/api/user/item', {
      intent: this.state.text
  }).then((res) => {
      console.log(res['data']['result']);
      this.state.conversation.push({'class' : 'bot', 'message' : res['data']['result']})
      this.forceUpdate()
    }).catch(function (error) {
      console.log(error)
    })

  }

    // This is needed for the component to render properly
    componentDidMount(){

    }

  render() {
    let conversation = this.state.conversation.map((n, index) =>
            <div className="message">
              <span className={n.class}>
                {n.message}
              </span>

            </div>
        );
    const {className, ...props} = this.props
    return (
      <div className={classnames('Chat', className)}>

        <div id="chatArea">

          {conversation}
        </div>
            <input type="text" value={this.state.text} onChange={this.handleChange} placeholder="Enter message here">
            </input>
            <button onClick={this.handleSubmit}>Enter</button>
      </div>
    );
  }
}

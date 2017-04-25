import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import './style.css';
import axios from 'axios';

export class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            'text' : '',
            'sessionId': '123456', //TODO: generate unique sessionIds
            'conversation': [{
              'class' : '',
              'message' : ''
            }],

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
        this.axiosCall = this.axiosCall.bind(this);
    };

    // Updating this.state.text variable as user types
  handleChange(event) {
    this.setState({text: event.target.value})
  }

  axiosCall(){
    console.log("Conversation: " + this.state.text)
    this.state.conversation.push({'class' : 'user', 'message' : this.state.text})
    this.setState({'text': ''});
    this.forceUpdate();
    this.updateScroll();
    console.log("SessionId handleSubmit: " + this.state.sessionId)
    axios.post('/api/request', {
        intent: this.state.text,
        sessionId: this.state.sessionId,

  }).then((res) => {
      console.log(res['data']['result']);
      this.state.conversation.push({'class' : 'bot', 'message' : res['data']['result']})
      this.forceUpdate();
      this.updateScroll();
    }).catch(function (error) {
      console.log(error)
    })
  }


  // Send post request to chatbot containing the user's request
  // contained in parameter 'intent'
  handleSubmit(event) {

    this.axiosCall();

  }


  updateScroll(){
    var element = document.getElementById("chatArea");
    element.scrollTop = element.scrollHeight;
  }
    // This is needed for the component to render properly
    componentDidMount(){
        console.log("In the componentDidMount")
        axios.post('/api/init', {
            sessionId: this.state.sessionId,
        }).then((res) => {
            console.log(res['data']['result']);
            this.state.conversation.push({'class' : 'bot', 'message' : res['data']['result']})
            this.forceUpdate();
            this.updateScroll();
        }).catch(function (error) {
            console.log(error)
        })
    }

    checkEnter(event){
        if (event.key == 'Enter'){
            this.axiosCall();
        }
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
        <div id="textArea">
            <span id="textSpan">
              <input id="textInput" type="text" value={this.state.text} onChange={this.handleChange} onKeyPress={this.checkEnter} placeholder="Enter message here"></input>
            </span>
            <button id="textButton" onClick={this.handleSubmit}>Enter</button>

        </div>
      </div>
    );
  }
}

import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import './style.css';
import axios from 'axios';

export class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            'text' : '',
            'sessionId': '', //TODO: generate unique sessionIds
            'userName': '12345',
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

  // Send post request to chatbot containing the user's request
  // contained in parameter 'intent'

  axiosCall(){

      this.userCall()

    axios.post('/api/request/text', {
        intent: this.state.text,
        sessionId: this.state.sessionId,
        userName: this.state.userName,

    }).then((res) => {
        console.log(res['data']['result']);
        this.state.conversation.push({'class' : 'bot', 'message' : res['data']['result']})
        this.forceUpdate();
        this.updateScroll();

        if(res['data']['isCompleted']){
            setTimeout(this.nextConversation(), 10000)
        }

    }).catch(function (error) {
      console.log(error)
    })
  }

  userCall(){

      this.state.conversation.push({'class' : 'user', 'message' : this.state.text})
      this.setState({'text': ''});
      this.forceUpdate();
      this.updateScroll();
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
    // This is needed for the component to render properly & trigger WELCOME salutation event
    componentDidMount(){
        this.executeSalutation("WELCOME")
    }

    //Triggers the NEXT salutation event
    nextConversation(){
        this.executeSalutation("NEXT")
    }

    //Executes any of the two salutations
    executeSalutation(intentName){

        this.generateNewSessionId()
        axios.post('/api/request/salutation', {
            sessionId: this.state.sessionId,
            event: intentName
        }).then((res) => {
            console.log("response" + res);
            this.state.conversation.push({'class' : 'bot', 'message' : res['data']['result']})
            this.forceUpdate();
            this.updateScroll();
        }).catch(function (error) {
            console.log("error in salutation")
            console.log(error.stack)
        })

    }
    generateNewSessionId(){
        //TODO: generate a uuid for sessions
        this.state.sessionId = Math.floor(Math.random() * (12345678 - 0 + 1)) + 0;
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

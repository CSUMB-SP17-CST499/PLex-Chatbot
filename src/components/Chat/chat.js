import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import './style.css';
import axios from 'axios';



export class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            'text' : ''
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
    axios.post('http://localhost:8080/api/user/item', {
      intent: this.state.text
    }).then(function (res) {
      console.log(res)
    }).catch(function (error) {
      console.log(error)
    })
    this.setState({'text': ''});
  }
    
    // This is needed for the component to render properly
    componentDidMount(){
        
    }
    
  render() {
    const {className, ...props} = this.props
    return (
      <div className={classnames('Chat', className)}>
        
        <div>
        
        </div>
            <input type="text" value={this.state.text} onChange={this.handleChange} placeholder="Enter message here">
            </input> 
            <button onClick={this.handleSubmit}>Enter</button>
      </div>
    );
  }
}



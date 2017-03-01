import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import './style.css'


export class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            'text' : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    
    handleChange(event) {
        this.setState({text: event.target.text});
    }
    handleSubmit(event) {
        
        event.preventDefault();
        
        // This just prints out the text to console to see if it worked.
        console.log(this.state.text)
        
        this.setState({'text':''});
        event.preventDefault();
    }
    componentDidMount(){
        
    }
    
  render() {
    const {className, ...props} = this.props
    return (
      <div className={classnames('App', className)}>
        <div className="App-header">
        </div>
        <div>
        
        </div>
        <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.text} onChange={this.handleChange} placeholder="Enter message here">
            </input> 
            <button>Enter</button>
        </form>
      </div>
    );
  }
}



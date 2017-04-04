import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import './style.css';
import axios from 'axios';

import config from '../../../config/server-info'

export class Notebook extends Component{
    constructor(props){
        super(props);
        
    
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    componentDidMount(){
        
    }
    
    render(){
        
        return(
            <div>
            
            </div>
        
        );
    }
    
}
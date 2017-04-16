import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import './style.css';
import axios from 'axios';

import config from '../../../config/server-info'

export class Notebook extends Component{
    constructor(props){
        super(props);
        this.state={
          'item':[{
            'name' : '',
            'price' : '',
            'image' : '',
            'description' : ''

          }]
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){

    }

    render(){
        let items = this.state.items.map((n, index) =>
          <div className="item">
              <span className='itemName'>
                {n.name}
              </span>
              <img className='itemPic' src={n.image}>
              <div className='itemDescription'>
                {n.description}
              </div>
          </div>
      )
        return(
            <div>

            </div>

        );
    }

}

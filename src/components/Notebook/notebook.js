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
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleRefresh(){
      //Axios call goes here and updates state array
      this.forceUpdate();
    }
    componentDidMount(){

    }

    render(){
        let items = this.state.item.map((n, index) =>
          <div className="item">
              <img className='itemPic' src={n.image} />
              <span className='itemName'>
                {n.price} : {n.name}
              </span>
              <div className='itemDescription'>
                {n.description}
              </div>
          </div>
      );
        return(
          <div className="notebook">
            <button id="refresh" onClick={this.handleRefresh}>Refresh Notebook</button>
            <div>
              {items}
            </div>
          </div>
        );
    }

}

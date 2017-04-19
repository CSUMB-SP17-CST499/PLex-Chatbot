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
            'name' : 'Chair',
            'price' : '$40',
            'image' : 'https://images.hayneedle.com/mgen/options:FLSH912_15_Orange.jpg?is=555,555,0xffffff',
            'description' : 'Orange chair'

          }]
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleRefresh(){
      //Axios call goes here and updates state array
      axios.get('/api/item').then((res) => {
        console.log(res);
        this.forceUpdate();
      }).catch(function (error){
        console.log(error);
      })
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

            <div id="itemList">
              {items}
            </div>
            <button id="refresh" onClick={this.handleRefresh}>Refresh Notebook</button>
          </div>
        );
    }

}

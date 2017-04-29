import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import './style.css';
import axios from 'axios';

import config from '../../../config/server-info'

export class Notebook extends Component{
    constructor(props){
        super(props);
        this.state={
          'item':[]
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleRefresh(){
      //Axios call goes here and updates state array
      axios.get('/api/item').then((res) => {

        // Refreshes the items from the database if the database has more
        // items than the client does.
        for (var i = this.state.item.length; i < res['data']['items'].length; i++){
          console.log(res['data']['items'][i]);
          this.state.item.push({
            'name' : res['data']['items'][i].name,
            'image' : res['data']['items'][i].picture,
            'description' : res['data']['items'][i].description
          })
        };
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

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
          var mat = '';
          if (res['data']['items'][i].material.length != 0){
            mat = "Material : " + res['data']['items'][i].material
          }
          var fab = '';
          if (res['data']['items'][i].fabric.length != 0){
            fab = "Fabric : " + res['data']['items'][i].fabric
          }

          this.state.item.push({
            'name' : res['data']['items'][i].name,
            'price' : res['data']['items'][i]['price'].amount + " " + res['data']['items'][i]['price'].currency,
            'image' : res['data']['items'][i].picture,
            'description' : res['data']['items'][i].description,
            'material' : mat,
            'fabric' : fab
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
              <span>
                {n.fabric}
              </span>
              <span>
                {n.material}
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

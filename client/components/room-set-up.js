import React, { Component } from 'react'
import {getUserLocation, getGeoHash} from './utils'
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { withFirebase } from '../Firebase/index';
import { compose } from 'recompose';
import firebase from 'firebase';

class RoomSetUp extends Component {
    constructor() {
        super()
        this.state = {
            location: {
                geohash: null
            }
        }
    }
    async componentDidMount() {
        const geohash = await getGeoHash(6)
        console.log('geohash ====>', geohash)
        this.setState({
            location:{
                geohash
            }
        })
        // const coordinates = await getUserLocation() 
        // const {latitude, longitude} = coordinates.coords
        // console.log(latitude, longitude)
      
        // this.setState({
        //     location:{
        //         latitude,
        //         longitude
        //     }
        // })
        
    }

    render() {
        // console.log(this.state)
        return(
            <div className="box">
            <div className="title">
              <p className="title">ALOL</p>
              <button>X</button>
            </div>
            <div className="body">
              <p className="title">Finding a room...</p>
              <p className="title">{this.state.location.geohash}</p>
            </div>
          </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
    return {};
  };
  
  const mapDispatch = dispatch => {
    return {
      me: name => dispatch(me(name))
    };
  };
  
  // The `withRouter` wrapper makes sure that updates are not blocked
  // when the url changes
  const RoomSetUpConnect = compose(
    withRouter,
    withFirebase,
    connect(mapState, mapDispatch)
  );
  
  export default RoomSetUpConnect(RoomSetUp);
  
  /**
   * PROP TYPES
   */
  
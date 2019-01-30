import { connect } from 'react-redux'
import {Map, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react'

export class MapContainer extends Component {
    constructor() {
        super()
        this.state = {
            lat: 0,
            lng: 0
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            lat: nextProps.position.lat,
            lng: nextProps.position.lng         
        })
    }

    render() {
    const {lat, lng} = this.state

    return (
        <div id="map">
            <p>{lat},{lng}</p>
            <Map google={this.props.google}
                zoom={14} 
                initialCenter={{lat, lng}}>
            </Map>
        </div>
    );
  }
}
 
const wrappedMapContainer =  GoogleApiWrapper({
  apiKey: 'AIzaSyBz7fOQpPA70ewMAtpQPIXjYxDq40fdTro'
})(MapContainer)

const mapState = (state) => {
    return {position: state.position}
}

export default connect(mapState)(wrappedMapContainer)    
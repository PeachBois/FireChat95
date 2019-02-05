import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase/index'
import { compose } from 'recompose'
import { me, logout } from '../store/user'
import { loadLocation, setZoom } from '../store/map'
import { setRadius, setCap } from '../store/posts'
import Map from '../components/map'
import { getMapApi } from '../components/utils'

class ChangeName extends Component {
  constructor () {
    super()
    this.state = {
      displayName: '',
      radius: 4,
      roomCap: 2,
      showMap: false,
      mapFailed: false,
      located: false
    }
    this.toggleMap = this.toggleMap.bind(this)
  }
  componentDidMount () {
    this.setState({ displayName: this.props.user.username })
    if (!this.state.located) {
      this.setState({ located: true })
      this.props.loadLocation(this.state.radius)
      getMapApi()

      if (this.props.position) {
        if (this.props.position.bounds === 'failed') {
          this.setState({ mapFailed: true })
        }
      }
    }
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleZoom = evt => {
    this.props.loadLocation(evt.target.value)
    let zoom
    switch (+evt.target.value) {
      case 1:
        zoom = 2
        break
      case 2:
        zoom = 5
        break
      case 3:
        zoom = 7
        break
      case 4:
        zoom = 10
        break
      case 5:
        zoom = 12
        break
      case 6:
        zoom = 15
        break
      case 7:
        zoom = 17
        break
      default:
        zoom = 1.5 * evt.target.value + 7
    }
    this.props.setZoom(zoom)
  }
  handleSubmit = evt => {
    if (this.state.displayName !== '') {
      this.props.me({
        username: this.state.displayName,
        email: this.props.user.email,
        imgUrl: this.props.user.imgUrl
      })
      this.props.setRadius(this.state.radius)
      this.props.setCap(this.state.roomCap)
      console.log('done')
    }
    this.props.history.push('/locating')
  }
  // searchArea = evt => {
  //   //other functions can go here
  //   console.log(typeof +evt.target.value)
  //   // this.props.setZoom(+evt.target.value)
  // }

  toggleMap () {
    this.setState(prevState => {
      return {
        showMap: !prevState.showMap
      }
    })
    console.log(this.state.showMap)
  }

  render () {
    if (!this.props.user.imgUrl) {
      this.props.history.push('/')
    }
    let style = this.state.showMap ? { height: '190px' } : { height: '0px' }

    let { displayName } = this.state
    const { imgUrl } = this.props.user
    return (
      <div className='box'>
        <div className='title'>
          <p className='title'>ALOL</p>
          <button
            onClick={async () => {
              this.props.logout()
              await this.props.firebase.auth.signOut().then(() => {
                this.props.history.push('/')
              })
            }}
          >
            X
          </button>
        </div>
        {/* <div id="map"></div> */}
        <div className='body'>
          <div className='userSpace'>
            <img src={imgUrl} className='userImg' />

            <div className='changeName'>
              <p className='title'>Set A Display Name</p>
              <input
                type='text'
                value={displayName}
                name='displayName'
                onChange={this.handleChange}
              />
              <div className='apart'>
                <p className='title'>Search Threshold:</p>

                <select
                  name='radius'
                  className='input'
                  value={this.state.radius}
                  onChange={this.handleZoom}
                >
                  <option value='1'>1 (largest search area)</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8 (smallest search area) </option>
                </select>
              </div>
              <div className='apart'>
                <p className='title'>Max Users:</p>
                <select
                  name='roomCap'
                  className='input'
                  value={this.state.roomCap}
                  onChange={this.handleChange}
                >
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='change'>
            <button type='submit' onClick={this.toggleMap}>
              {this.state.showMap ? 'Hide Map' : 'Show Map'}
            </button>
            {this.state.showMap && <Map />}
            <button type='submit' onClick={this.handleSubmit}>
              Login
            </button>
          </div>
          <div className='map'>
            {this.state.mapFailed ? (
              <h4>Bust!</h4>
            ) : (
              <div id='map' style={style} />
            )}
          </div>
        </div>
        <div className='body'>
          <div className='help'>
            <img src='computer.png' className='bottomBar' />
            <h4 className='log'>
              >: Here you can change your display name, as well as how many
              people you want in a chat and how exact your search area is!
            </h4>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return { user: state.user, location: state.position }
}

const mapDispatch = dispatch => {
  return {
    me: name => dispatch(me(name)),
    loadLocation: radius => dispatch(loadLocation(radius)),
    setZoom: value => dispatch(setZoom(value)),
    setRadius: radius => dispatch(setRadius(radius)),
    setCap: cap => dispatch(setCap(cap)),
    logout: () => dispatch(logout())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
const MessageBoxConnect = compose(
  withRouter,
  withFirebase,
  connect(
    mapState,
    mapDispatch
  )
)

export default MessageBoxConnect(ChangeName)

/**
 * PROP TYPES
 */

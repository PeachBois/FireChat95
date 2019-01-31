
import {getUserLocation} from '../components/utils'
/**
 * ACTION TYPES
 */
const SET_LOCATION = 'SET_LOCATION'
const SET_ZOOM = 'SET_ZOOM'
/**
 * INITIAL STATE
 */
const initialLocation = {
    lat: 41.895266,
    lng: -87.639035,
    zoom: 18    
}

/**
 * ACTION CREATORS
 */
const setLocation = (coordinates) => ({ type: SET_LOCATION, coordinates })
export const setZoom = (value) => {
    return { type: SET_ZOOM, value }
}

/**
 * THUNK CREATORS
 */


export const loadLocation = () => async dispatch => {
  try {
    const location = await getUserLocation()
    const coordinates = {lat: location.coords.latitude, lng: location.coords.longitude}
    dispatch(setLocation(coordinates))
  } catch (err) {
    return console.error(err)
  }
}

/**
 * REDUCER
 */

export default function (state = initialLocation, action) {
  switch (action.type) {
    case SET_LOCATION:
        return { ...state, ...action.coordinates }
    case SET_ZOOM: {
        return { ...state, zoom: action.value}
    }
    
    default:
        return state
  }
}



import {getUserLocation, getGeoHash, getBounds} from '../components/utils'
/**
 * ACTION TYPES
 */
const SET_LOCATION = 'SET_LOCATION'
const SET_ZOOM = 'SET_ZOOM'
const SET_BOUNDS = 'SET_BOUNDS'
/**
 * INITIAL STATE
 */
const initialLocation = {
    lat: 41.895266,
    lng: -87.639035,
    zoom: 11,
    bounds: {
      ne: {},
      sw: {}
    }
}

/**
 * ACTION CREATORS
 */
const setLocation = (coordinates) => ({ type: SET_LOCATION, coordinates })
export const setZoom = (value) => {
    return { type: SET_ZOOM, value }
}
export const setBounds = bounds => ({ type: SET_BOUNDS, bounds})

/**
 * THUNK CREATORS
 */


export const loadLocation = (precision = 5) => async dispatch => {
  try {
    const location = await getUserLocation()
    const coordinates = {lat: location.coords.latitude, lng: location.coords.longitude}
    console.log('radius is', precision)
    const geohash = await getGeoHash(location, precision)
    const bounds = getBounds(geohash)
    dispatch(setBounds(bounds))
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
    case SET_BOUNDS:
        return {...state, bounds: action.bounds }
    default:
        return state
  }
}


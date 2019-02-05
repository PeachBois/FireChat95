import { getUserLocation, getGeoHash, getBounds } from '../components/utils'
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
  zoom: 10,
  bounds: {
    ne: {},
    sw: {}
  }
}

/**
 * ACTION CREATORS
 */
const setLocation = coordinates => ({ type: SET_LOCATION, coordinates })
export const setZoom = value => {
  return { type: SET_ZOOM, value }
}
export const setBounds = bounds => ({ type: SET_BOUNDS, bounds })

/**
 * THUNK CREATORS
 */

export const loadLocation = (precision = 5) => async dispatch => {
  try {
    console.log('trying')
    const location = await getUserLocation()
    console.log('location:', location)

    const coordinates = {
      lat: location.coords.latitude,
      lng: location.coords.longitude
    }
    const geohash = await getGeoHash(coordinates, precision)
    console.log('geohash', geohash)
    const bounds = await getBounds(geohash)
    console.log('bounds', bounds)
    console.log(
      'coords:',
      coordinates,
      'geohash:',
      geohash,
      'bounds:',
      bounds,
      'location:',
      location
    )
    dispatch(setBounds(bounds))
    dispatch(setLocation(coordinates))
  } catch (err) {
    dispatch(setBounds('failed'))
    dispatch(setLocation('failed'))
    console.log('failed')
    console.error(err)
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
      return { ...state, zoom: action.value }
    }
    case SET_BOUNDS:
      return { ...state, bounds: action.bounds }
    default:
      return state
  }
}

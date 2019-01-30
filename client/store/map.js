
import {getUserLocation} from '../components/utils'
/**
 * ACTION TYPES
 */
const SET_LOCATION = 'SET_LOCATION'

/**
 * INITIAL STATE
 */
const initialLocation = {
    lat: 0,
    lng: 0
}

/**
 * ACTION CREATORS
 */
const setLocation = (coordinates) => ({ type: SET_LOCATION, coordinates })

/**
 * THUNK CREATORS
 */


export const loadLocation = () => async dispatch => {
  try {
    const location = await getUserLocation()
    console.log(location.coords)
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

    default:
      return state
  }
}


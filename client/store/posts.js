import history from '../history'

/**
 * ACTION TYPES
 */
const GET_POST = 'GET_POST'
const SET_HASH = 'SET_HASH'

/**
 * INITIAL STATE
 */
const defaultPosts = {}

/**
 * ACTION CREATORS
 */
const gotPost = post => ({ type: GET_POST, post })

export const setHash = hash => ({ type: SET_HASH, hash })

/**
 * THUNK CREATORS
 */
let post = ''

export const getPost = () => async dispatch => {
  try {
    console.log(post)
    dispatch(gotPost(post))
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }
}

/**
 * REDUCER
 */

export default function (state = defaultPosts, action) {
  switch (action.type) {
    case GET_POST:
      return { ...state, posts: action.post }
    case SET_HASH:
      return { ...state, hash: action.hash }

    default:
      return state
  }
}

import history from '../history'

/**
 * ACTION TYPES
 */
const GET_POST = 'GET_POST'

/**
 * INITIAL STATE
 */
const defaultPosts = {}

/**
 * ACTION CREATORS
 */
const gotPost = post => ({ type: GET_POST, post })

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

    default:
      return state
  }
}

function signIn(state = {user: false, error: false}, action) {
  switch(action.type) {
    case 'LOG_IN':
      return Object.assign({}, state, {user: action.payload})

    case 'LOG_OUT':
      return Object.assign({}, state, {user: action.payload})

    case 'LOGIN_ERROR':
      return Object.assign({}, state, {error: action.payload})

    case 'RESOLVE_ERROR':
      return Object.assign({}, state, {error: action.payload})
    
    default:
      return state;
  }
}

export default signIn;
function signIn(state = {user: false, error: false, userInfo: null}, action) {
  switch(action.type) {
    case 'LOG_IN':
      return Object.assign({}, state, {user: action.payload});

    case 'LOG_OUT':
      return Object.assign({}, state, {user: action.payload});

    case 'LOGIN_ERROR':
      return Object.assign({}, state, {error: action.payload});

    case 'RESOLVE_ERROR':
      return Object.assign({}, state, {error: action.payload});
    
    case 'RECEIVED_USER_INFO':
      return Object.assign({}, state, {userInfo: action.payload});

    default:
      return state;
  }
}

export default signIn;
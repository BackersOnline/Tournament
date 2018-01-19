function views(state = {create: false, join: true, joined: false, created: false}, action) {
  switch(action.type) {
    case 'CREATE_TOURNAMENT':
      return Object.assign({}, {create: true, join: false, joined: false, created: false})

    case 'JOIN_TOURNAMENT':
      return Object.assign({}, {create: false, join: true, joined: false, created: false})
    
    case 'HAS_JOINED':
      return Object.assign({}, {create: false, join: false, joined: true, created: false})

    case 'ORGANIZER_ONLY': 
      return Object.assign({}, {create: false, join: false, joined: false, created: true})

    default:
      return state
  }
}

export default views
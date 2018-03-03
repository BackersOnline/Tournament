function date(state = {date: null}, action) {
  switch (action.type) {
    case 'UPDATE_DATE':
      return Object.assign({}, state, {date: action.payload});
    default:
      return state;
  }
}

export default date;
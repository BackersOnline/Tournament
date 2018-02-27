function nav(state = {view: null}, action) {
  switch (action.type) {
    case 'CHANGE_VIEW':
      return Object.assign({}, state, {view: action.payload});
    default: 
      return state;
  };
}

export default nav;
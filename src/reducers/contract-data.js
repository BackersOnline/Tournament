import createJSON from '../../build/contracts/CreateTournament.json'
import tournyJSON from '../../build/contracts/Tournament.json'

function contractData(state = {createABI: createJSON.abi, tournyABI: tournyJSON.abi, createAddress: "0x9473e2345628c6a19605aa1b1048be620b6bfa79", tournyAddress: ""}, action) {
  switch(action.type) {
    case 'UPDATE_TOURNY_ADDRESS':
      return Object.assign({}, state, {tournyAddress: action.payload})

    default:
      return state
  }
}

export default contractData
const initialState = {
  payers: [],
}

const payerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PAYER':
    return {
      ...state,
      payers: action.payload,
    }
    case 'ADD_PAYER':
      return {
        ...state,
        payers: state.payers.concat(action.payload)
      }
    case 'DELETE_PAYER':
      return {
        ...state,
        payers: state.payers.filter(payer => payer.id !== action.payload)
      }
    case 'CLEAR_PAYERS':
      return {
        ...state,
        payers: []
      }
    default:
      return state
  }
}

export default payerReducer

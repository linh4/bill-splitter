const initialState = {
  payers: []
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
        payers: [...state.payers, action.payload]
      }
    default:
      return state
  }
}

export default payerReducer

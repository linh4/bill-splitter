const initialState = {
  payers: [],
  payerArr: [],
  selectedPayer: null
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
    case 'FETCH_PAYERS':
      return {
        ...state,
        payerArr: action.payload
      }
    case 'SELECTED_PAYER':
      return {
        ...state,
        selectedPayer: action.payload
      }
    default:
      return state
  }
}

export default payerReducer

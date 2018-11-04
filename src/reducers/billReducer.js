const initialState = {
  // imgData: null,
  bill: null,
  items: null
}

const billReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BILL':
      return {
        ...state,
        bill: action.payload
      }
    case 'GET_ITEMS':
    return {
      ...state,
      items: action.payload
    }
    default:
      return state
  }
}

export default billReducer;

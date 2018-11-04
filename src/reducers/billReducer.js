const initialState = {
  // imgData: null,
  bills: [],
  items: []
}

const billReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BILL':
      return {
        ...state,
        bills: [...state.bills, action.payload]
      }
    case 'ADD_ITEMS':
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    default:
      return state
  }
}

export default billReducer;

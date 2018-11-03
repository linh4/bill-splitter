const initialState = {
  // imgData: null,
  bill: [],
  billList: null
}

const textReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BILL':
      return {
        ...state,
        bill: [...state.bill, action.payload]
      }
    // case 'ADD_IMG':
    //   return {
    //     ...state,
    //     imgData: action.payload
    //   }
    case 'RENDER_TEXT':
      return {
        ...state,
        billList: action.payload
      }
    default:
      return state
  }
}

export default textReducer;

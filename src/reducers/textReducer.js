const initialState = {
  imgData: null,
  billList: null
}

const textReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_IMG':
      return {
        ...state,
        imgData: action.payload
      }
    case 'RENDER_TEXT':
    // console.log(action.payload)
      return {
        ...state,
        billList: action.payload
      }
    default:
      return state
  }
}

export default textReducer;

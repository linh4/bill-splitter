const initialState = {
  user: {},
  imgData: null,
  billList: null
}

const textReducer = (state = initialState, action) => {
  switch (action.type) {

    case "UPDATE_USER":
    return {
      ...state,
      user: action.payload
    }

    case 'ADD_IMG':
      return {
        ...state,
        imgData: action.payload
      }
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

const textReducer = (state = {imgData: null}, action) => {
  switch (action.type) {
    case "ADD_IMG":
      return {
        ...state,
        imgData: action.payload
      }
    default:
      return state
  }
}

export default textReducer;

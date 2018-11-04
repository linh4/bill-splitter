const initialState = {
  bill: {},
  items: []
}

const billReducer = (state = initialState, action) => {

  let item;

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
    case 'EDIT_ITEM':
      return {
        ...state,
      }
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    default:
      return state
  }
}

export default billReducer;

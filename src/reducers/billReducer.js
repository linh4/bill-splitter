const initialState = {
  bill: {},
  items: [],
  selectedItem: {},
}

const billReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'GET_ITEMS':
      return {
        ...state,
        items: state.items.concat(action.payload)
      }
    case 'GET_BILL':
      return {
        ...state,
        bill: action.payload
      }
    case 'SELECT_ITEM':
    console.log("inside store state", action.payload)
      return {
        ...state,
        selectedItem: action.payload
      }
    case 'EDIT_ITEM':
      const newItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          return {...item, ...action.payload}
        }
        return item
      })
    return {...state, items: newItems}
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    case 'RESET_ITEMS':
      return {items: []}
    default:
      return state
  }
}

export default billReducer;

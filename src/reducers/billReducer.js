const initialState = {
  bill: {},
  items: [],
  selectedItem: {},
  itemArr: []
}

const billReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SAVE_ARRAY':
      return {
        ...state,
        itemArr: state.itemArr.concat(action.payload)
      }
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
    default:
      return state
  }
}

export default billReducer;

const initialState = {
  bill: {},
  items: [],
  selectedItem: null,
  wholeBill: null,
  tax: 0
}

const billReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'GET_ITEMS':
      if (action.payload.hasOwnProperty('payers')) {
        return {
          ...state,
          // items: action.payload.items,
          wholeBill: action.payload
        }
      }
      else {
        return {
          ...state,
          items: state.items.concat(action.payload)
        }
      }

    case 'GET_BILL':
      return {
        ...state,
        bill: action.payload
      }
    case 'SELECT_ITEM':
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
      return {
        ...state,
        items: []
      }
    case 'RESET_BILL':
      return {
        ...state,
        wholeBill: null
      }
    case 'ADD_TAX':
      return {
        ...state,
        tax: action.payload
      }
    // case 'CLEAR_TAX':
    //   return {
    //     ...state,
    //     tax: 0
    //   }
    default:
      return state
  }
}

export default billReducer;

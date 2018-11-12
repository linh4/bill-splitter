const initialState = {
  bill: {},
  items: [],
  selectedItem: null,
  wholeBill: null,
  tax: 0,
  tip: 0,
  allBill: [],
  name: null
}

const billReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'RENDER_BILLS':
      return {
        ...state,
        allBill: action.payload
      }
    case 'GET_ITEMS':
      if (action.payload.hasOwnProperty('payers')) {
        return {
          ...state,
          items: action.payload.items,
          wholeBill: action.payload,
          tax: action.payload.tax,
          tip: action.payload.tip,
          name: action.payload.date
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
    case 'DELETE_BILL':
      return {
        ...state,
        allBill: state.allBill.filter(bill => bill.id !== action.payload)
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
    case 'ADD_TIP':
      return {
        ...state,
        tip: action.payload
      }
    case 'ADD_NAME':
      return {
        ...state,
        name: action.payload
      }
    default:
      return state
  }
}

export default billReducer;

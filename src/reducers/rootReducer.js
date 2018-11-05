// import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux';
import billReducer from './billReducer'
import userReducer from './userReducer'
import payerReducer from './payerReducer'

const rootReducer = combineReducers({
  text: billReducer,
  user: userReducer,
  payer: payerReducer
})

export default rootReducer

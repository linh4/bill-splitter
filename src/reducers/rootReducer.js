// import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux';
import billReducer from './billReducer'
import userReducer from './userReducer'
import itemReducer from './itemReducer'

const rootReducer = combineReducers({
  text: billReducer,
  user: userReducer,
  item: itemReducer
})

export default rootReducer

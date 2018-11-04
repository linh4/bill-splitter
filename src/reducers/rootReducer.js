// import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux';
import billReducer from './billReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  text: billReducer,
  user: userReducer
})

export default rootReducer

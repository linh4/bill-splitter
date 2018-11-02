// import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux';
import textReducer from './textReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  text: textReducer,
  user: userReducer
})

export default rootReducer

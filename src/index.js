import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer'
import { Provider } from 'react-redux';
// import { BrowserRouter as Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';

const store = createStore(rootReducer, applyMiddleware(thunk))
// console.log(store.getState())

ReactDOM.render(<Provider store={store}>
  <BrowserRouter>
   <App />
   </BrowserRouter>
  </Provider>,
   document.getElementById('root'));
// registerServiceWorker();

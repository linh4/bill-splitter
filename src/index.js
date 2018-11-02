import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/rootReducer'
import { Provider } from 'react-redux';
// import { BrowserRouter as Router} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));
// console.log(store.getState())

ReactDOM.render(<Provider store={store}>
  <BrowserRouter>
   <App />
   </BrowserRouter>
  </Provider>,
   document.getElementById('root'));
// registerServiceWorker();

// export * from './actions/userAction'
// export * from './actions/billAction'

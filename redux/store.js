// Avec la méthode configureStore de REDUX TOOLKIT
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import appReducer from './reducers/appReducer';

const rootReducer = combineReducers({
  users: appReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;

// Avec la méthode createStore de REDUX
// import { combineReducers, createStore } from 'redux';
// import appReducer from './reducers/appReducer';

// const rootReducer = combineReducers({
//     users: appReducer
// })

// const store = createStore(rootReducer);

// export default store;

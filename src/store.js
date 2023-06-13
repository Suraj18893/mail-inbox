import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import mailReducer from './reducers/mailReducer';
import mailSaga from './sagas/mailSaga';

// Create a Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with the mailReducer and apply the Saga middleware
const store = createStore(mailReducer, applyMiddleware(sagaMiddleware));

// Run the mailSaga using the Saga middleware
sagaMiddleware.run(mailSaga);

export default store;

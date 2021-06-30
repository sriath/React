import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { storeName, storeLoc, counter } from './reducer';


const rootReducer = combineReducers({
  storeName,
  storeLoc,
  counter
})

const logger = storeAPI => next => action => {
	if (action.type === 'SET_NAME') {
		const newVal = action;
		newVal.data.location = 'Mumbai';
		console.log('PPPP', action);
		return next(action)
	}
	return next(action)
}

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
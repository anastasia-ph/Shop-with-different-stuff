import { createStore } from 'redux';
import { rootReducer as reducers } from './reducers/reducers';
const store = createStore(reducers);
export default store;

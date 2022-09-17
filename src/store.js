import { createStore } from 'redux';
import shopReducer from './reducers/reducers';
const store = createStore(shopReducer);
export default store;

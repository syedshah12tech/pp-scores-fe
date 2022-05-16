import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import notificationReducer from './notificationReducer';

export default combineReducers({
 playerReducer,
 notificationReducer
});
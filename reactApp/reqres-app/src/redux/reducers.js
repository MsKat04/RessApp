import { combineReducers } from 'redux';
import { SET_USERS, SET_TOKEN, SET_PROFILE } from './actions';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.payload;
    default:
      return state;
  }
};

const tokenReducer = (state = localStorage.getItem('token') || null, action) => {
  switch (action.type) {
    case SET_TOKEN:
      localStorage.setItem('token', action.payload);
      return action.payload;
    default:
      return state;
  }
};

const profileReducer = (state = JSON.parse(localStorage.getItem('profile')) || {}, action) => {
  switch (action.type) {
    case SET_PROFILE:
      localStorage.setItem('profile', JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  users: usersReducer,
  token: tokenReducer,
  profile: profileReducer,
});
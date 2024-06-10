export const SET_USERS = 'SET_USERS';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_PROFILE = 'SET_PROFILE';

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const setProfile = (profile) => ({
  type: SET_PROFILE,
  payload: profile,
});
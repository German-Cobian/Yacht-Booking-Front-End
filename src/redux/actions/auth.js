import { Navigate } from 'react-router-dom';
import { AUTHENTICATED, NOT_AUTHENTICATED } from '../../constants';

const setToken = (token) => {
  localStorage.setItem('token', token);
  localStorage.setItem('lastLoginTime', new Date(Date.now()).getTime());
};

export const getToken = () => {
  const now = new Date(Date.now()).getTime();
  const ninetyMinutes = 1000 * 60 * 90;
  const timeSinceLastLogin = now - localStorage.getItem('lastLoginTime');
  if (timeSinceLastLogin < ninetyMinutes) {
    return localStorage.getItem('token');
  }
  return false;
};

export const checkAuth = () => (dispatch) => fetch('http://localhost:3001/current_user', {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: getToken(),
  },
}).then((res) => {
  if (res.ok) {
    return res.json().then((user) => dispatch({ type: AUTHENTICATED, payload: user }));
  }
  return Promise.reject(dispatch({ type: NOT_AUTHENTICATED }));
});

export const signupUser = (credentials) => (dispatch) => fetch('http://localhost:3001/signup', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ user: credentials }),
}).then((res) => {
  if (res.ok) {
    setToken(res.headers.get('Authorization'));
    return res
      .json()
      .then((userJson) => dispatch({ type: AUTHENTICATED, payload: userJson.data }));
  }
  return res.json().then((errors) => {
    dispatch({ type: NOT_AUTHENTICATED });
    return Promise.reject(errors);
  });
});

export const loginUser = (credentials) => (dispatch) => fetch('http://localhost:3001/login', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ user: credentials }),
}).then((res) => {
  if (res.ok) {
    setToken(res.headers.get('Authorization'));
    return res
      .json()
      .then((userJson) => dispatch({ type: AUTHENTICATED, payload: userJson.data }));
  }
  return res.json().then((errors) => {
    dispatch({ type: NOT_AUTHENTICATED });
    return Promise.reject(errors);
  });
});

export const logoutUser = () => (dispatch) => fetch('http://localhost:3001/logout', {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: getToken(),
  },
}).then((res) => {
  if (res.ok) {
    localStorage.removeItem('token');
      <Navigate to="/login" replace />;
  }
  return res.json().then((errors) => {
    dispatch({ type: NOT_AUTHENTICATED });
    return Promise.reject(errors);
  });
});

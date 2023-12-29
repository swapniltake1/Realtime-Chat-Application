import { BASE_API_URL } from '../../Config/Config.js';
import {
  REGISTER,
  LOGIN_USER,
  REQ_USER,
  SEARCH_USER,
  UPDATE_USER,
  LOGOUT_USER
} from './ActionType';

export const register = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();
    if (resData.jwt) localStorage.setItem('token', resData.jwt);
    dispatch({ type: REGISTER, payload: resData });
  } catch (error) {
    console.error('Registration error:', error);
  }
};

export const loginUser = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();
    if (resData.jwt) localStorage.setItem('token', resData.jwt);
    dispatch({ type: LOGIN_USER, payload: resData });
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const currentUser = (token) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/users/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const resData = await res.json();
   console.log("current chat data",resData);
    dispatch({ type: REQ_USER, payload: resData });
  } catch (error) {
    console.error('Fetch current user error:', error);
  }
};

export const searchUser = (data) => async (dispatch) => {
  console.log("Searching for ::: ", data);
  try {
    const res = await fetch(
      `${BASE_API_URL}/api/users/search?name=${data.keyword}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    const resData = await res.json();
    console.log("Searched Usrr",resData);
    dispatch({ type: SEARCH_USER, payload: resData });
  } catch (error) {
    console.error('Search user error:', error);
  }
};

export const updateUser = (data) => async (dispatch) => {

  console.log("received data for update req ::",data);
  try {
    const res = await fetch(
      `${BASE_API_URL}/api/users/update`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
        
        body: JSON.stringify(data.data),
      }
    );
    const resData = await res.json();
    console.log("profile updated successfullyyy::: ",resData);
    dispatch({ type: UPDATE_USER, payload: resData });
  } catch (error) {
    console.error('Update user error:', error);
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT_USER, payload: null });
  dispatch({ type: REQ_USER, payload: null });
  console.log('User logged out successfully...');
};

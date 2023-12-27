import {
    REGISTER,
    LOGIN_USER,
    REQ_USER,
    SEARCH_USER,
    UPDATE_USER,
    LOGOUT_USER
  } from "./ActionType";
  
  const initialState = {
    signin: null,
    signup: null,
    reqUser: null,
    searchUser: [],
    updatedUser: null,

  };
  
  export const authReducer = (state = initialState, { type, payload }) => {
    if (type === REGISTER) {
      return { ...state, signup: payload };
    } else if (type === LOGIN_USER) {
      return { ...state, signin: payload };
    } else if (type === REQ_USER) {
      return { ...state, reqUser: payload };
    } else if (type === SEARCH_USER) {
      return { ...state, searchUser: payload };
    } else if (type === UPDATE_USER) {
      return { ...state, updatedUser: payload };
    } else if (type === LOGOUT_USER) {
      return {
        ...state,
        signin: null,
        signup: null,
        reqUser: null
      };
    } else {
      return state;
    }
  };
  
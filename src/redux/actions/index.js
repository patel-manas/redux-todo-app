import { fetchTodos } from "../external";

const ADD_TODO = "ADD_TODO";
const EDIT_TODO = "EDIT_TODO";
const DELETE_TODO = "DELETE_TODO";
const COMPLETE_TODO = "COMPLETE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const SET_TODOS = "SET_TODOS";
const SHOW_SPINNER = "SHOW_SPINNER";
const HIDE_SPINNER = "HIDE_SPINNER";

export const actionTypes = {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  COMPLETE_TODO,
  SET_TODOS,
  SHOW_SPINNER,
  HIDE_SPINNER,
  UPDATE_TODO
};

export const addTodo = payload => {
  return {
    type: actionTypes.ADD_TODO,
    payload
  };
};
export const deleteTodo = payload => {
  return {
    type: actionTypes.DELETE_TODO,
    payload
  };
};
export const editTodo = payload => {
  return {
    type: actionTypes.EDIT_TODO,
    payload
  };
};
export const updateTodo = payload => {
  return {
    type: actionTypes.UPDATE_TODO,
    payload
  };
};
export const completeTodo = payload => {
  return {
    type: actionTypes.COMPLETE_TODO,
    payload
  };
};
export const setTodo = payload => {
  return {
    type: actionTypes.SET_TODOS,
    payload
  };
};
export const showSpinner = payload => {
  return {
    type: actionTypes.SHOW_SPINNER
  };
};

export const hideSpinner = payload => {
  return {
    type: actionTypes.HIDE_SPINNER
  };
};

export const getTodo = payload => {
  return dispatch => {
    dispatch(showSpinner());
    fetchTodos().then(response => {
      dispatch(setTodo(response.data));
      dispatch(hideSpinner());
    });
  };
};

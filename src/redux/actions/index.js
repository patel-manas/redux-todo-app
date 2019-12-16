import { fetchTodos } from "../external";

const ADD_TODO = "ADD_TODO";
const EDIT_TODO = "EDIT_TODO";
const DELETE_TODO = "DELETE_TODO";
const COMPLETE_TODO = "COMPLETE_TODO";
const SET_TODOS = "SET_TODOS";
const GET_TODOS = "GET_TODOS";

export const actionTypes = {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  COMPLETE_TODO,
  SET_TODOS,
  GET_TODOS
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
export const getTodo = payload => {
  return dispatch => {
    fetchTodos().then(response => {
      dispatch(setTodo(response.data));
    });
  };
};

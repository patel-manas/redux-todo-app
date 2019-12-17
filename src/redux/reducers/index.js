import { actionTypes } from "../actions";

let innitialState = {
  edit: false,
  id: null,
  title: "",
  todos: [],
  loading: false
};

const reducer = (state = innitialState, action) => {
  let currentState = { ...state };
  switch (action.type) {
    case actionTypes.SET_TODOS: {
      currentState.todos = action.payload;
      return currentState;
    }

    case actionTypes.ADD_TODO: {
      currentState.todos = [
        ...currentState.todos,
        {
          id: Date.now(),
          title: action.payload,
          done: false,
          date: new Date()
        }
      ];
      return currentState;
    }

    case actionTypes.DELETE_TODO: {
      currentState.todos = currentState.todos.filter(
        todo => todo.id !== action.payload
      );
      return currentState;
    }

    case actionTypes.EDIT_TODO: {
      const { id, edit, title } = action.payload;
      currentState.id = id;
      currentState.edit = edit;
      currentState.title = title;
      return currentState;
    }

    case actionTypes.UPDATE_TODO: {
      currentState.todos = currentState.todos.map(todo => {
        if (todo.id === currentState.id) {
          return Object.assign(todo, { title: action.payload });
        }
        return todo;
      });
      currentState.edit = false;
      return currentState;
    }

    case actionTypes.COMPLETE_TODO: {
      currentState.todos = currentState.todos.map(todo => {
        if (todo.id === action.payload) {
          return Object.assign(todo, { done: true });
        }
        return todo;
      });
      return currentState;
    }

    case actionTypes.SHOW_SPINNER: {
      currentState.loading = true;
      return currentState;
    }

    case actionTypes.HIDE_SPINNER: {
      currentState.loading = false;
      return currentState;
    }

    default: {
      return currentState;
    }
  }
};

export default reducer;

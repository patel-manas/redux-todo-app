import axios from "axios";

export const fetchTodos = () => {
  const url =
    "https://raw.githubusercontent.com/patel-manas/assets/master/data/todolist.json";
  return axios.get(url);
};

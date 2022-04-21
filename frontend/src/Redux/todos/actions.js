import axios from "axios";

export const ADD_TODO = "ADD_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const GET_TODOS = "GET_TODOS";
export const DELETE_TODO = "DELETE_TODO";

export function AddTodo(todo) {
  return {
    type: ADD_TODO,
    payload: todo,
  };
}

export function EditTodo(todo) {
  return {
    type: EDIT_TODO,
    payload: todo,
  };
}

export function GetTodos(todos) {
  return {
    type: GET_TODOS,
    payload: todos,
  };
}

export function DeleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: id,
  };
}

export function AddTodoThunk(todo) {
  return (dispatch) => {
    let token = localStorage.getItem("TodoLoginToken");
    axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/api/todos`,
        { title: todo.title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(AddTodo(res.data));
      });
  };
}

export function EditTodoThunk(todo) {
  return (dispatch) => {
    let token = localStorage.getItem("TodoLoginToken");
    axios
      .put(
        `${process.env.REACT_APP_API_SERVER}/api/todos`,
        { title: todo.title, id: todo.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(EditTodo(res.data));
      });
  };
}

export function GetTodosThunk() {
  return (dispatch) => {
    let token = localStorage.getItem("TodoLoginToken");
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(GetTodos(res.data));
      });
  };
}

export function DeleteTodoThunk(id) {
  return (dispatch) => {
    let token = localStorage.getItem("TodoLoginToken");
    axios
      .delete(`${process.env.REACT_APP_API_SERVER}/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(DeleteTodo(res.data));
      });
  };
}

export const GET_INFO = "GET_INFO";

export function GetInfo(info) {
  return {
    type: GET_INFO,
    payload: info,
  };
}

export function GetInfoThunk() {
  return (dispatch) => {
    let token = localStorage.getItem("TodoLoginToken");

    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response, "Thunk Action");
        dispatch(GetInfo(response.data[0].username));
      });
  };
}

import axios from "axios";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const loginUserThunk = (email, password) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        if (response.data === null) {
          console.log("Login failed");
        } else {
          console.log(response.data);
          localStorage.setItem("TodoLoginToken", response.data.token);
          dispatch({ type: LOGIN_USER });
        }
      });
  };
};

export const signupUserThunk = (email, password, username) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/auth/signup`, {
        email,
        password,
        username,
      })
      .then((response) => {
        console.log("Signup done");
        console.log(response);
      });
  };
};

export const logoutNowThunk = () => (dispatch) => {
  localStorage.removeItem("TodoLoginToken");
  dispatch({
    type: LOGOUT_USER,
  });
};

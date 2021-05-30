import api from "../api/api";

const UPDATE_EMAIL = "UPDATE_EMAIL";
const UPDATE_PASSWORD = "UPDATE_PASSWORD";
const SET_AUTH = "SET-AUTH";

const initialState = {
  email: "",
  password: "",
  auth: false,
};

const userReducer = (prevState = initialState, action) => {
  let state = { ...prevState };

  switch (action.type) {
    case UPDATE_EMAIL:
      let email = action.email;
      email = email.replace(/[^a-zA-Z-_.@0-9]/g, "");
      state.email = email;
      return state;

    case UPDATE_PASSWORD:
      let password = action.password;
      state.password = password;
      return state;

    case SET_AUTH:
      let auth = action.auth;
      state.auth = auth;
      return state;

    default:
      return state;
  }
};

export default userReducer;

export const updateEmailAC = (email = "") => ({ type: UPDATE_EMAIL, email });
export const updatePasswordAC = (password = "") => ({
  type: UPDATE_PASSWORD,
  password,
});
export const setAuthAC = (auth = false) => ({ type: SET_AUTH, auth });

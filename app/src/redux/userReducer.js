const UPDATE_EMAIL = "UPDATE-EMAIL";
const UPDATE_PASSWORD = "UPDATE-PASSWORD";
const UPDATE_ERROR = "UPDATE-ERROR";
const SET_AUTH = "SET-AUTH";
const SET_IS_LOGIN = "SET-IS-LOGIN";

const initialState = {
  email: "",
  password: "",
  auth: false,
  error: "",
  isLogin: true,
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

    case UPDATE_ERROR:
      let error = action.error;
      state.error = error;
      return state;

    case SET_AUTH:
      let auth = action.auth;
      state.auth = auth;
      return state;

    case SET_IS_LOGIN:
      let isLogin = action.isLogin;
      state.isLogin = isLogin;
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
export const updateErrorAC = (error = "") => ({ type: UPDATE_ERROR, error });
export const setAuthAC = (auth = false) => ({ type: SET_AUTH, auth });
export const setIsLoginAC = (isLogin = true) => ({
  type: SET_IS_LOGIN,
  isLogin,
});

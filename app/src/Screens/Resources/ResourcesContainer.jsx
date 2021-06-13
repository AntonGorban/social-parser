import React from "react";
import { connect } from "react-redux";
import {
  updateEmailAC,
  updatePasswordAC,
  setAuthAC,
  updateErrorAC,
  setIsLoginAC,
} from "../../redux/userReducer";
import { Resources } from "./Resources";

let mapStateToProps = (state) => ({ user: state.user });

let mapDispatchToProps = (dispatch) => ({
  updateEmail: (email) => dispatch(updateEmailAC(email)),
  updatePassword: (password) => dispatch(updatePasswordAC(password)),
  updateError: (error) => dispatch(updateErrorAC(error)),
  setAuth: (auth) => dispatch(setAuthAC(auth)),
  setIsLogin: (isLogin) => dispatch(setIsLoginAC(isLogin)),
});

export const ResourcesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Resources);
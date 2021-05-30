import React from "react";
import { connect } from "react-redux";
import {
  updateEmailAC,
  updatePasswordAC,
  setAuthAC,
} from "../../redux/userReducer";
import { Auth } from "./Auth";

let mapStateToProps = (state) => ({ user: state.user });

let mapDispatchToProps = (dispatch) => ({
  updateEmail: (email) => dispatch(updateEmailAC(email)),
  updatePassword: (password) => dispatch(updatePasswordAC(password)),
  setAuth: (auth) => dispatch(setAuthAC(auth)),
});

export const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth);

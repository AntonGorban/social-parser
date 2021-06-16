import React from "react";
import { connect } from "react-redux";
import App from "./App";

import { setAuthAC } from "./redux/userReducer";

let mapStateToProps = (state) => ({ isAuth: state.user.auth });

let mapDispatchToProps = (dispatch) => ({
  setAuth: (auth) => dispatch(setAuthAC(auth)),
});

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

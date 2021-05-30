import React from "react";
import { connect } from "react-redux";
import App from "./App";

let mapStateToProps = (state) => ({ isAuth: state.user.auth });

let mapDispatchToProps = (dispatch) => ({});

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

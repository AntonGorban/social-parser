import React from "react";
import api from "../../api/api";
import { AuthPresentation } from "./AuthPresentation";

export class Auth extends React.Component {
  onUpdateEmail = (email) => {
    this.props.updateEmail(email);
  };

  onUpdatePassword = (password) => {
    this.props.updatePassword(password);
  };

  setAuthTrue = () => {
    this.props.setAuth(true);
  };

  setAuthFalse = () => {
    this.props.setAuth(false);
  };

  render() {
    return (
      <AuthPresentation
        user={this.props.user}
        onUpdateEmail={this.onUpdateEmail}
        onUpdatePassword={this.onUpdatePassword}
        setAuthTrue={this.setAuthTrue}
        setAuthFalse={this.setAuthFalse}
      />
    );
  }
}

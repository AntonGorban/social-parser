import React from "react";
import api from "../../api/api";
import { AuthPresentation } from "./AuthPresentation";

// let history = useHistory();
export class Auth extends React.Component {
  onUpdateEmail = (event) => this.props.updateEmail(event.target.value);

  onUpdatePassword = (event) => this.props.updatePassword(event.target.value);

  _updateError = (event) => this.props.updateError(event.target.value);

  setIsLoginTrue = () => this.props.setIsLogin(true);

  setIsLoginFalse = () => this.props.setIsLogin(false);

  render() {
    return (
      <AuthPresentation
        user={this.props.user}
        onUpdateEmail={this.onUpdateEmail}
        onUpdatePassword={this.onUpdatePassword}
        setIsLoginTrue={this.setIsLoginTrue}
        setIsLoginFalse={this.setIsLoginFalse}
      />
    );
  }
}

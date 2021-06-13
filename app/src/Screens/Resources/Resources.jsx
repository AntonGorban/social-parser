import React from "react";
import api from "../../api/api";
import { ResourcesPresentation } from "./ResourcesPresentation";

// let history = useHistory();
export class Resources extends React.Component {
  onUpdateEmail = (event) => this.props.updateEmail(event.target.value);

  onUpdatePassword = (event) => this.props.updatePassword(event.target.value);

  _updateError = (event) => this.props.updateError(event.target.value);

  setIsLoginTrue = () => this.props.setIsLogin(true);

  setIsLoginFalse = () => this.props.setIsLogin(false);

  async componentDidMount() {
    // console.log("sdfsf");
    // let token = window.localStorage.getItem("token") || null;
    // if (token) {
    //   api.apiToken = token;
    //   token = await api.user.auth();
    //   if (token.status === 200) {
    //     window.localStorage.setItem("token", token.data.token);
    //     api.apiToken = token.data.token;
    //     this.props.setAuth(true);
    //   }
    // }
  }

  _valid = () => {
    const emailRegExp =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.props.user.email.length < 5) {
      this.props.updateError("Email не может быть короче 5 символов");
      return false;
    } else if (this.props.user.email.length > 255) {
      this.props.updateError("Email не может быть блиннее 255 символов");
      return false;
    } else if (!emailRegExp.test(this.props.user.email)) {
      this.props.updateError("Не корректный email");
      return false;
    } else if (this.props.user.password.length < 5) {
      this.props.updateError("Пароль не может быть короче 5 символов");
      return false;
    } else if (this.props.user.password.length > 50) {
      this.props.updateError("Пароль не может быть блиннее 255 символов");
      return false;
    } else {
      this.props.updateError("");
      return true;
    }
  };

  registration = async () => {
    if (this._valid()) {
      try {
        const token = await api.user.reg({
          email: this.props.user.email,
          password: this.props.user.password,
        });
        if (token.status === 201) {
          window.localStorage.setItem("token", token.data.token);
          api.apiToken = token.data.token;
          console.log(token);
          this.props.setAuth(true);
        } else {
          this.props.updateError(`${token.data.message} [${token.status}]`);
        }
      } catch (error) {
        this.props.updateError(
          `${error.response.data.message} [${error.response.status}]`
        );
        console.dir(error);
      }
    }
  };

  login = async () => {
    if (this._valid()) {
      try {
        const token = await api.user.login({
          email: this.props.user.email,
          password: this.props.user.password,
        });
        if (token.status === 200) {
          window.localStorage.setItem("token", token.data.token);
          api.apiToken = token.data.token;
          console.log(token);
          this.props.setAuth(true);
        } else {
          this.props.updateError(`${token.data.message} [${token.status}]`);
        }
      } catch (error) {
        this.props.updateError(
          `${error.response.data.message} [${error.response.status}]`
        );
        console.dir(error);
      }
    }
  };

  render() {
    return (
      <ResourcesPresentation
        user={this.props.user}
        onUpdateEmail={this.onUpdateEmail}
        onUpdatePassword={this.onUpdatePassword}
        setIsLoginTrue={this.setIsLoginTrue}
        setIsLoginFalse={this.setIsLoginFalse}
        registration={this.registration}
        login={this.login}
      />
    );
  }
}

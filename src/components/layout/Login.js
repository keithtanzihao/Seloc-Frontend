import axios from "axios";
import React from "react";
import { NavLink, withRouter, Redirect } from "react-router-dom";

import Button from "../ui/button/Button";

import loginImg from "../../styles/vendors/imgs/login/loginImg.png";
import styles from "../../styles/main.module.scss";

const BASE_API_URL = "http://localhost:3001/";

// Need to change this later cos its from Razia
const REGEX = {
  name: new RegExp(/^[A-Za-zÀ-ȕ\s\-]*$/),
  email: new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ),
};

class Login extends React.Component {
  state = {
    credentials: {
      email: "",
      password: "",
    },
    isValidMsg: {
      email: "",
      password: "",
    },
  };

  validateEmail = (value) => {
    if (value.trim() === "") return "Cannot be empty";
    if (!REGEX.email.test(value)) return "Invalid format";
    return "valid";
  };

  validatePassword = (value) => {
    if (value.trim() === "") return "Cannot be empty";
    if (value.length < 8) return "Must be at least 8 characters long";
    return "valid";
  };

  isValidForm = (isValidMsg) => {
    for (let msg in isValidMsg) {
      if (isValidMsg[msg] !== "valid") return false;
    }
    return true;
  };

  updateCredentials = (event, validateFunc) => {
    const prevCredentials = Object.assign({}, this.state.credentials);
    const prevIsValidMsg = Object.assign({}, this.state.isValidMsg);

    prevCredentials[event.target.name] = event.target.value;
    prevIsValidMsg[event.target.name] = validateFunc(event.target.value);

    this.setState({
      credentials: prevCredentials,
      isValidMsg: prevIsValidMsg,
    });
  };

  buttonEvent = async (event) => {
    // Stops form from firing
    event.preventDefault();

    if (this.isValidForm) {
      const { credentials } = this.state;
      await axios.post(BASE_API_URL + "login", {
        ...credentials,
      });
      // Redirects to path
      this.props.history.replace("/techniques");
    }
  };

  render() {
    const { credentials, isValidMsg } = this.state;

    return (
      <main className={`${styles["login"]}`}>
        <div className={`${styles["login__ctn--left"]}`}>
          <img src={loginImg} />
        </div>

        <div className={`${styles["login__ctn--right"]}`}>
          
          <h1>Login</h1>
          <div className={`${styles["login__ctn--content"]}`}>
            <form className={`${styles["login__form"]}`}>
              <div className={`${styles["login__form"]}`}>
                <label>User Email</label>
                <div>
                  <input
                    type="text"
                    name="email"
                    value={credentials.email}
                    onChange={(event) =>
                      this.updateCredentials(event, this.validateEmail)
                    }
                    placeholder="Email"
                  />
                  <span>{isValidMsg.email}</span>
                </div>
              </div>

              <div className={`${styles["login__form"]}`}>
                <label>User Password</label>
                <div>
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={(event) =>
                      this.updateCredentials(event, this.validatePassword)
                    }
                    placeholder="Password"
                  />
                  <span>{isValidMsg.password}</span>
                </div>
              </div>

              <Button
                class={`${styles["login__btn"]}`}
                content="Login"
                clickEvent={this.buttonEvent}
              />
            </form>

            <div className={`${styles["login__ctn--switch"]}`}>
              <h1>
                Don't have an account <NavLink to="/register"> Sign Up</NavLink>
              </h1>
            </div>
          </div>

        </div>
      </main>
    );
  }
}

export default withRouter(Login);

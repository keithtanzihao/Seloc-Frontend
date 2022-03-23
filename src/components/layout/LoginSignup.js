import React from "react";
import { NavLink } from "react-router-dom";

import Button from "../ui/button/Button";

import styles from "../../styles/main.module.scss";
import Login from "../ui/svg/Login";

export default class LoginSignup extends React.Component {
  BASE_API_URL = "https://letstalkbackend.herokuapp.com/";

  state = {
    type: this.props.login,

    email: "",
    password: "",

    credentialsValidity: {
      email: true,
      password: true,
    },
  };

  credentialsIsEmpty = (value) => value.trim() === "";
  credentialsIsShort = (value) => value.trim().length < 8;
  credentialsRegex = (value) => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(this.state.email)) {
      return true;
    }
    return false;
  };

  // Validates if empty
  credentialsUpdate = (event) => {
    // Cannot handle copy and paste yet. Need to fix later
    let validateResult = false;
    if (event.target.name === "email") {
      validateResult = this.credentialsRegex(event.target.value);
    }
    if (event.target.name === "password") {
      validateResult = !this.credentialsIsShort(event.target.value);
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
        credentialsValidity: {
          ...prevState.credentialsValidity,
          [event.target.name]: validateResult,
        },
      };
    });
  };

  render() {
    const mailControlClass = `${
      this.state.credentialsValidity.email ? "" : styles["login__form--invalid"]
    }`;

    const passwordControlClass = `${
      this.state.credentialsValidity.password
        ? ""
        : styles["login__form--invalid"]
    }`;

    return (
      <main className={`${styles["login"]}`}>

        <section className={`${styles["login__ctn"]}`}>
          <h1>Sign Up</h1>
          <form className={`${styles["login__form"]}`} action="">
            <input
              className={mailControlClass}
              type="text"
              placeholder="Email Address"
              name="email"
              value={this.state.email || ""}
              onChange={this.credentialsUpdate}
            />
            {!this.state.credentialsValidity.email && (
              <span>Enter a valid email</span>
            )}

            <input
              className={passwordControlClass}
              type="password"
              placeholder="Password (8+ characters)"
              name="password"
              value={this.state.password || ""}
              onChange={this.credentialsUpdate}
            />
            {!this.state.credentialsValidity.password && (
              <span>
                Enter a valid password
                <br />
                (Minimum 8 Characters)
              </span>
            )}

            <a href="">Forgot Password</a>

            <Button class={`${styles["btn--login"]}`} content="Login" />
          </form>

          <NavLink to="/signup">
            <Button class={`${styles["btn--signup"]}`} content="Sign Up" />
          </NavLink>
          
          {/* Login SVG image */}
          <Login/>

        </section>
      </main>
    );
  }
}

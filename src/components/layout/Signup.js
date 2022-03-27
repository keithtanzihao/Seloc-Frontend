import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import Button from "../ui/button/Button";

import styles from "../../styles/main.module.scss";
import Login from "../ui/svg/Login";

export default class Signup extends React.Component {
  BASE_API_URL = "https://letstalkbackend.herokuapp.com/";

  state = {
    authType: this.props.authType,
    form: {
      "First Name": "",
      "Last Name": "",
      Email: "",
      Password: "",
    },
    credentialsValidity: {
      "First Name": true,
      "Last Name": true,
      Email: true,
      Password: true,
    },
  };

  /**
   * Definitely need to use joi or refactor this later, its too long
   *  */
  credentialsIsEmpty = (value) => value.trim() === "";
  credentialsIsShort = (value) => value.trim().length < 8;
  credentialsRegex = (value) => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(this.state.form["Email"])) {
      return true;
    }
    return false;
  };
  // Validates if empty
  credentialsUpdate = (event) => {
    // Cannot handle copy and paste yet. Need to fix later
    let validateResult = false;
    const { form, credentialsValidity } = this.state;

    if (event.target.name === "Email") {
      validateResult = this.credentialsRegex(event.target.value);
    }
    if (event.target.name === "Password") {
      validateResult = !this.credentialsIsShort(event.target.value);
    }
    if (
      event.target.name === "First Name" ||
      event.target.name === "Last Name"
    ) {
      validateResult = !this.credentialsIsEmpty(event.target.value);
    }
    this.setState({
      form: {
        ...form,
        [event.target.name]: event.target.value,
      },
      credentialsValidity: {
        ...credentialsValidity,
        [event.target.name]: validateResult,
      },
    });
  };

  // Render base input tags
  renderInputs = (value) => {
    const { form, credentialsValidity } = this.state;

    return Object.entries(form).map(([key, val]) => {
      let inputType = key === "Password" ? "password" : "text";
      let msg = key === "Password" ? "(Minimum 8 Characters)" : "";

      return (
        <React.Fragment key={key}>
          <input
            className={
              credentialsValidity[key] ? "" : styles["login__form--invalid"]
            }
            type={inputType}
            name={key}
            placeholder={key}
            value={this.state.val}
            onChange={this.credentialsUpdate}
          />
          {!this.state.credentialsValidity[key] && (
            <span>
              Enter a valid {key.toLowerCase()} {msg}
            </span>
          )}
        </React.Fragment>
      );
    });
  };

  // Add new User
  addUserRequest = async (event) => {
    // Must have to work;
    event.preventDefault();

    const { credentialsValidity } = this.state;
    const formIsValid =
      credentialsValidity["First Name"] &&
      credentialsValidity["Last Name"] &&
      credentialsValidity["Email"] &&
      credentialsValidity["Password"];

    if (!formIsValid) {
      return;
    } else {
      await axios.post(this.BASE_API_URL + "signup", {
        firstName: this.state.form["First Name"],
        lastName: this.state.form["Last Name"],
        email: this.state.form["Email"],
        password: this.state.form["Password"],
        profileImage: "testing",
      });
    }
  };

  render() {
    return (
      <main className={`${styles["login"]}`}>
        <section className={`${styles["login__ctn"]}`}>
          <h1>Sign Up</h1>
          <form className={`${styles["login__form"]}`} action="">
            {/* Render input tags */}
            {this.renderInputs()}

            {/* <a href="">Forgot Password</a> */}

            <Button
              class={`${styles["btn--login"]}`}
              content="Sign Up"
              clickEvent={this.addUserRequest}
            />
          </form>

          <h1>Already have an Account</h1>

          <NavLink to="/signup">
            <Button class={`${styles["btn--signup"]}`} content="Login" />
          </NavLink>

          {/* Login SVG image */}
          <Login />
        </section>
      </main>
    );
  }
}

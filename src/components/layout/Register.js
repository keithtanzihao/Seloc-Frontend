import axios from "axios";
import React from "react";
import { NavLink, withRouter, Redirect } from "react-router-dom";

import Button from "../ui/button/Button";

import signupImg from "../../styles/vendors/imgs/login/signupImg.png";
import styles from "../../styles/main.module.scss";

// Need to change this later cos its from Razia
const REGEX = {
  name: new RegExp(/^[A-Za-zÀ-ȕ\s\-]*$/),
  email: new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ),
};

// BASE_API_URL = "https://letstalkbackend.herokuapp.com/";
const BASE_API_URL = "http://localhost:3001/";

let searchTimer;

class Register extends React.Component {
  state = {
    credentials: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    isValidMsg: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    flashMsg: ""
  };

  // Can merge later
  validateName = (value) => {
    if (value.trim() === "") return "Names cannot be empty";
    if (!REGEX.name.test(value)) return "Names must only contain alphabets";
    return "valid";
  };

  validateEmail = (value) => {
    if (value.trim() === "") return "Email cannot be empty";
    if (!REGEX.email.test(value)) return "Invalid email format";
    return "valid";
  };

  validatePassword = (value) => {
    if (value.trim() === "") return "Password cannot be empty";
    if (value.length < 8) return "Password must be at least 8 characters long";
    return "valid";
  };

  isValidForm = (isValidMsg) => {
    for (let msg in isValidMsg) {
      // console.log(`${msg}: ${isValidMsg[msg]}`);
      if (isValidMsg[msg] !== "valid") {
        return false;
      }
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

    // Success / Email already exist error message
    let response = await axios.get(
      BASE_API_URL + "register/" + this.state.credentials.email
    );
    let responseMsg =
      response.data && response.data.email === this.state.credentials.email
        ? "Email already exist"
        : "Success";

    console.log("------------------ response.data");
    console.log(response.data);

    console.log("------------------ responseMsg");
    console.log(responseMsg);

    this.setState({
      flashMsg: responseMsg,
    });

    console.log("------------------ isValidForm, response.data");
    console.log(this.isValidForm(this.state.isValidMsg), !response.data);

    
    if (this.isValidForm(this.state.isValidMsg) && !response.data) {
      const { credentials } = this.state;
      await axios.post(BASE_API_URL + "register", {
        ...credentials,
        profileImage: "",
      });
      // Redirects to path
      this.props.history.replace("/techniques");
    }
  };

  render() {
    const { history } = this.props;
    const { credentials, isValidMsg, flashMsg } = this.state;

    return (
      <main className={`${styles["signup"]}`}>
        <div className={`${styles["signup__ctn--left"]}`}>
          <img src={signupImg} />
        </div>

        <div className={`${styles["signup__ctn--right"]}`}>
          <h1>Sign Up</h1>
          <span>{this.state.flashMsg}</span>
          <div className={`${styles["signup__ctn--content"]}`}>
            <form className={`${styles["signup__form"]}`}>

              <div className={`${styles["signup__form"]}`}>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={credentials.firstName}
                  onChange={(event) =>
                    this.updateCredentials(event, this.validateName)
                  }
                  placeholder="First Name"
                />
                <span>{isValidMsg.firstName}</span>
              </div>

              <div className={`${styles["signup__form"]}`}>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={credentials.lastName}
                  onChange={(event) =>
                    this.updateCredentials(event, this.validateName)
                  }
                  placeholder="Last Name"
                />
                <span>{isValidMsg.lastName}</span>
              </div>

              <div className={`${styles["signup__form"]}`}>
                <label>Email</label>
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

              <div className={`${styles["signup__form"]}`}>
                <label>Password</label>
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

              <Button class={`${styles["signup__btn"]}`} content="Sign Up" clickEvent={this.buttonEvent} />
            </form>

            <div className={`${styles["signup__ctn--switch"]}`}>
              <h1>Already have an account <NavLink to="/login">Login</NavLink></h1>
            </div>

          </div>

        </div>
      </main>
    );
  }
}

export default withRouter(Register);

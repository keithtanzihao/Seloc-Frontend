import React from "react";
import { NavLink } from "react-router-dom";

import NavbarMenu from "./NavbarMenu";
import NavbarBrand from "./NavbarBrand";
import Button from "../button/Button";

import styles from "../../../styles/main.module.css";

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className={`${styles["navbar"]}`}>
        <div className={`${styles["navbar__sectionCtn"]}`}>
          <NavbarMenu setIsMenuOpen={this.props.setIsMenuOpen} />
          <NavbarBrand />
        </div>

        <NavLink to="/login">
          <Button class={`${styles["navbtn"]}`} content="Login" />
        </NavLink>
      </nav>
    );
  }
}

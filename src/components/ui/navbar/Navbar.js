import React from "react";

import NavbarMenu from "./NavbarMenu";
import NavbarBrand from "./NavbarBrand";
import NavbarButton from "./NavbarButton";

import styles from "../../../styles/main.module.css";

export default class Navbar extends React.Component {

  render() {
    return (
      <nav className={`${styles["navbar"]}`}>
        <div className={`${styles["navbar__sectionCtn"]}`}>
          <NavbarMenu setIsMenuOpen={this.props.setIsMenuOpen}/>
          <NavbarBrand />
        </div>
        <NavbarButton />
      </nav>
    );
  }
}

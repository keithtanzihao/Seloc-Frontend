import React from "react";
import { NavLink } from "react-router-dom";

import NavbarMenu from "./NavbarMenu";

import styles from "../../../styles/main.module.css";

import { IconContext } from "react-icons";
import {
  BsFillBookFill,
  BsFillPersonFill,
} from "react-icons/bs";

export default class Navbar extends React.Component {

  render() {
    return (
      <nav className={`${styles["navbar"]}`}>
        <div className={`${styles["navbar__ctn"]}`}>

          <div>
            <NavbarMenu isMenuOpen={this.props.isMenuOpen} setIsMenuOpen={this.props.setIsMenuOpen} />
            <h1 className={`${styles["navbar__title"]}`}>BetterLife</h1>
          </div>

          <ul className={`${styles["navbar__list"]}`}>


            <IconContext.Provider
              value={{ className: `${styles["navbar__icons"]}` }}
            >
              <NavLink to="/techniques">
                <li className={`${styles["navbar__item"]}`}>
                  <BsFillBookFill />
                  Library
                </li>
              </NavLink>
              <NavLink to="/login">
                <li className={`${styles["navbar__item"]}`}>
                  <BsFillPersonFill />
                  Login
                </li>
              </NavLink>
            </IconContext.Provider>


          </ul>
        </div>
      </nav>
    );
  }
}

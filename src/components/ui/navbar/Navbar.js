import React from "react";
import { NavLink } from "react-router-dom";

import NavbarMenu from "./NavbarMenu";

import styles from "../../../styles/main.module.css";
import loginImg from "../../../styles/vendors/imgs/login/loginImg.png";

import { IconContext } from "react-icons";
import {
  BsFillHouseDoorFill,
  BsFillBookFill,
  BsFillPersonFill,
} from "react-icons/bs";

export default class Navbar extends React.Component {

  componentDidMount = () => {
    
  }

  render() {
    return (
      <nav className={`${styles["navbar"]}`}>
        <div className={`${styles["navbar__ctn"]}`}>
          <h1 className={`${styles["navbar__title"]}`}>BetterLife</h1>
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

            {/* <NavbarMenu setIsMenuOpen={this.props.setIsMenuOpen} /> */}
          </ul>
        </div>
      </nav>
    );
  }
}

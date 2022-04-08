import React from "react";
import { NavLink, withRouter, Redirect } from "react-router-dom";

import Arrow from "../svg/Arrow";

import styles from "../../../styles/main.module.css";

export default class Menu extends React.Component {
  state = {
    titlesList: ["Techniques", "Chat"],
    aboutList: ["Register", "Login", "About"],
  };

  renderMenuItems = (list) => {
    return list.map(function (itemTitle) {
      let lowerCaseTitle = itemTitle.toLowerCase();
      return (
        <React.Fragment key={itemTitle}>
          <NavLink to={lowerCaseTitle}>
            <li className={`${styles["menu__item"]}`}>
              <p className={`${styles["menu__item__title"]}`}>{itemTitle}</p>
              <Arrow />
            </li>
          </NavLink>
        </React.Fragment>
      );
    });
  };

  render() {
    return (
      <section className={`${styles["menu"]}`}>
        <div>
          <h3 className={`${styles["menu__header"]}`}>LetsTalk</h3>
          <ul>{this.renderMenuItems(this.state.titlesList)}</ul>
        </div>

        <div>
          <h3 className={`${styles["menu__header"]}`}>Extras</h3>
          <ul>{this.renderMenuItems(this.state.aboutList)}</ul>
        </div>
      </section>
    );
  }
}

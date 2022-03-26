import React from "react";

import Arrow from "../svg/Arrow";

import styles from "../../../styles/main.module.css";

export default class Menu extends React.Component {
  state = {
    titlesList: ["Articles", "Meditation", "Sleep", "Stress", "Mindfulness"],
    aboutList: ["Work", "About", "Help", "Login"],
  };

  renderMenuItems = (list) => {
    return list.map(function (itemTitle) {
      return (
        <React.Fragment key={itemTitle}>
          <li className={`${styles["menu__item"]}`}>
            <p className={`${styles["menu__item__title"]}`}>{itemTitle}</p>
            <Arrow />
          </li>
        </React.Fragment>

      );
    });
  };

  render() {
    return (
      <section className={`${styles["menu"]}`}>
        <div>
          <h3 className={`${styles["menu__header"]}`}>Browse articles</h3>
          <ul>{this.renderMenuItems(this.state.titlesList)}</ul>
        </div>

        <div>
          <h3 className={`${styles["menu__header"]}`}>About LetsTalk</h3>
          <ul>{this.renderMenuItems(this.state.aboutList)}</ul>
        </div>
      </section>
    );
  }
}

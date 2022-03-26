import React from "react";

import FrontpageSignup from "./fontpage/FrontpageSignup";

import styles from "../../styles/main.module.scss";

export default class Frontpage extends React.Component {
  render() {
    return (
      <main className={`${styles["frontpg"]}`}>
        <FrontpageSignup />
      </main>
    );
  }
}

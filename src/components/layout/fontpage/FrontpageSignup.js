import React from "react";

import Hero from "../../ui/svg/Hero";
import Button from "../../ui/button/Button";

import styles from "../../../styles/main.module.scss";

export default class FrontpageSignup extends React.Component {
  render() {
    return (
      <div className={`${styles["frontpg__signup"]}`}>
        <picture className={`${styles["frontpg__heroImgCtn"]}`}>
          <Hero />
        </picture>
        <h1 className={`${styles["frontpg__header"]}`}>
          Towards a better life
        </h1>
        <Button class={`${styles["frontpg__btn"]}`} content="Sign Up" />
      </div>
    );
  }
}

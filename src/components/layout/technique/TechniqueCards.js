import React, { Fragment } from "react";

import styles from "../../../styles/main.module.scss";

export default class TechniqueCards extends React.Component {
  techniqueSelected = () => {
    this.props.updateStateObjects("isDisplayOpen", true);
    this.props.updateStateObjects("selectedInfo", this.props.techniqueInfo);
  };

  renderCategories = () => {
    return this.props.techniqueInfo.category.map(function (element, index) {
      return (
        <Fragment key={`${element}${index}`}>
          <span>{element}</span>{" "}
        </Fragment>
      );
    });
  };

  render() {
    const { techniqueInfo } = this.props;

    return (
      <React.Fragment>
        <div
          className={`${styles["technique__card"]}`}
          onClick={this.techniqueSelected}
        >
          <img src={techniqueInfo.image} />

          <div className={`${styles["technique__cardCtn"]}`}>
            <h1>{techniqueInfo.title}</h1>

            <div className={`${styles["technique__cardCategory"]}`}>
              {this.renderCategories()}
            </div>

            <p>Difficulty: {techniqueInfo.difficulty}</p>
            <p>Duration: Approx {techniqueInfo.duration} hours</p>
          </div>
          
        </div>
      </React.Fragment>
    );
  }
}

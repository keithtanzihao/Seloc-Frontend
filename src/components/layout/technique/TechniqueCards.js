import React from "react";

import PlaceholderImg from "../../ui/svg/PlaceholderImg";

import styles from "../../../styles/main.module.scss";


export default class TechniqueCards extends React.Component {  
  render() {
    return (
      <React.Fragment>
        <div className={`${styles["technique__card"]}`}>
          <PlaceholderImg className={`${styles["technique__cardSvg"]}`}/>
          <h1>{this.props.title}</h1>
        </div>
      </React.Fragment>
    )
  }
}
import React from "react";

import styles from "../../../styles/main.module.css";

export default class Button extends React.Component {
  render() {
    return (
      <button className={this.props.class} onClick={this.props.clickEvent}>
        <p>{this.props.content}</p>
      </button>
    )
  }
}
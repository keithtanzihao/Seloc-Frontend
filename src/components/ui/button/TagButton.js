import React from "react";

import styles from "../../../styles/main.module.css";

export default class TagButton extends React.Component {

  state = {
    isChecked: false
  }

  updateIsChecked = () => {
    this.setState({
      isChecked: !this.state.isChecked
    })
  }

  render() {
    return (
      <div className={`${styles["tagBtn"]}`}>
        <label className={`${styles["tagBtn__content"]}`}>
          <input
            className={this.props.className}
            type="checkbox"
            name={this.props.category}
            value={this.props.category}
            onChange={this.props.onChange}
            checked={this.props.checked}
          />
          <span className={(this.props.checked) ?
              `${styles["tagBtn__title"]} ${styles["checked"]}` :
              `${styles["tagBtn__title"]}`
            }>
            {this.props.category}
          </span>
        </label>
      </div>
    );
  }
}

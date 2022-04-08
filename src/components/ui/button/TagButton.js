import React from "react";

import styles from "../../../styles/main.module.css";

export default class TagButton extends React.Component {
  render() {
    const { tag, className, updateSelectedTags, checked } = this.props;

    return (
      <div
        className={
          checked
            ? `${styles["tagBtn"]} ${styles["checked"]}`
            : `${styles["tagBtn"]}`
        }
      >
        <label className={`${styles["tagBtn__content"]} `}>
          <input
            className={className}
            type="checkbox"
            name={tag}
            value={tag}
            onChange={updateSelectedTags}
            checked={checked}
          />
          <span className={`${styles["tagBtn__title"]}`}>
            {/* Output tag btns */}
            {tag}
          </span>
        </label>
      </div>
    );
  }
}

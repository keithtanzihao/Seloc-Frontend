import React from "react";

import styles from "../../../styles/main.module.scss";

export default class TechniqueSearch extends React.Component {
  
  render() {
    return (
      <section className={`${styles["technique__searchCtn"]}`}>
        <input
          className={`${styles["technique__search"]}`}
          type="text"
          name="searchField"
          value={this.props.searchField}
          onChange={this.props.searchFieldUpdate}
          placeholder="Search"
        />
      </section>
    );
  }
}

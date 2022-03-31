import React from "react";

import styles from "../../../styles/main.module.scss";

export default class TechniqueCategory extends React.Component {
  render() {
    
    return (
      <React.Fragment>
        <div className={`${styles["techniqueModal__filter"]} ${this.props.hidden}`}>
          <div className={`${styles["techniqueModal__filter--broad"]}`}>
            <div className={`${styles["techniqueModal__filterMsg"]}`}>
              <span>Broad Matches</span>
              <span>
                Only match wellness techniques if all criterias are met.
              </span>
            </div>
            <input
              className={`${styles["techniqueModal__filterCheck"]}`}
              type="checkbox"
              name={this.props.name}
              value={this.props.value}
              onChange={this.props.updateIsBroadMatch}
              checked={this.props.value}
            />
          </div>

          <div className={`${styles["techniqueModal__filter--tags"]}`}>
            <div className={`${styles["techniqueModal__tagsMsg"]}`}>
              <span>Include Tags</span>
              <span>Find wellness techniques based on selected tags.</span>
            </div>

            <div className={`${styles["techniqueModal__tagsCtn"]}`}>
              {this.props.renderCategoryTags()}
            </div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}
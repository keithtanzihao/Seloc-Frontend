import React from "react";
import axios from "axios";

import TagButton from "../button/TagButton";
import TechniqueCategory from "../../layout/technique/TechniqueCategory";

import styles from "../../../styles/main.module.css";

/**
 * Layout of techniqueModal
 */
export default class TechniqueModal extends React.Component {
  BASE_API_URL = "http://localhost:3001/";

  state = {
    // tagType: "Category",
    tagType: "Painpoints",
  };

  renderCategoryTags = () => {
    let results = this.props.categoryFields.map(category => {
      return (
        <React.Fragment key={category}>
          <TagButton
            category={category}
            className={`${styles["tagBtn__checkbox"]}`}
            onChange={this.props.updateSelectedCategory}
            checked={this.props.selectedCategory.includes(category)}
          />
        </React.Fragment>
      );
    });
    return results;
  };

  renderPainTags = () => {
    let results = this.props.painpointsFields.map(painpoints => {
      return (
        <React.Fragment key={painpoints}>
          <TagButton
            category={painpoints}
            className={`${styles["tagBtn__checkbox"]}`}
            onChange={this.props.updateSelectedPainPoints}
            checked={this.props.selectedPainPoints.includes(painpoints)}
          />
        </React.Fragment>
      );
    });
    return results;
  }

  updateTagType = (tagType) => {
    this.setState({
      tagType: tagType
    })
  }
  
  render() {
    return (
      <div className={`${styles["techniqueModal"]}`}>
        {/* Lousy x placeholder first */}
        <span onClick={this.props.onClick}>X</span>
        <section className={`${styles["techniqueModal__ctn"]}`}>
          <header className={`${styles["techniqueModal__header"]}`}>
            <div className={`${styles["techniqueModal__header__part"]}`}>
              <h1 onClick={() => this.updateTagType("Category")}>Category</h1>
              <h1 onClick={() => this.updateTagType("Painpoints")}>Painpoint</h1>
            </div>

            <div className={`${styles["techniqueModal__header__part"]}`}>
              <button onClick={this.props.resetSelected}>Reset</button>
              <button>Apply</button>
            </div>
          </header>

          <TechniqueCategory
            hidden={this.state.tagType == "Category" ? "" : `${styles["techniqueModal__hidden"]}`}
            name="isCategoryBroadMatch"
            value={this.props.isCategoryBroadMatch}
            updateIsBroadMatch={(event) => this.props.updateIsBroadMatch(event, "isCategoryBroadMatch")}
            renderCategoryTags={this.renderCategoryTags}
          />

          <TechniqueCategory
            hidden={this.state.tagType == "Painpoints" ? "" : `${styles["techniqueModal__hidden"]}`}
            name="isPainpointBroadMatch"
            value={this.props.isPainpointBroadMatch}
            updateIsBroadMatch={(event) => this.props.updateIsBroadMatch(event, "isPainpointBroadMatch")}
            renderCategoryTags={this.renderPainTags}
          />
        </section>
      </div>
    );
  }
}

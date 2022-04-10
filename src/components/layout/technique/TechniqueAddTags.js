import React from "react";
import { NavLink } from "react-router-dom";

import Button from "../../ui/button/Button";
import TagButton from "../../ui/button/TagButton";

import styles from "../../../styles/main.module.scss";
import axios from "axios";

const BASE_API_URL = "https://letstalkbackend.herokuapp.com/";
// BASE_API_URL = "http://localhost:3001/";

export default class TechniqueAddTags extends React.Component {
  

  state = {
    categoryFields: [],
    selectedCategory: [],

    painpointsFields: [],
    selectedPainPoints: [],
  };

  componentDidMount = async () => {
    // Need to change these to a fixed set of categories / painpoints
    let categoryResp = ["Exercising", "Meditation", "Diet", "Communication", "Sleeping", "Mental Health", "Indoors", "Outdoors"];
    let painpointResp = ["Anger", "Sleep", "Focus", "Lifestyle", "Relationships", "Happiness", "Anxiety", "Mindfulness", "Stress", "Physical Health", "Mental Health"];

    this.setState({
      categoryFields: categoryResp,
      painpointsFields: painpointResp
    });
  };

  checkTagsNotEmpty = () => {
    if (this.props.addTags.category.length != 0 &&
      this.props.addTags.painpoints.length != 0) {
      return true;
    }
    return false;
  }

  renderFieldTags = (arrayField, selectedField, selectedFieldName) => {
    let results = arrayField.map((field) => {
      return (
        <React.Fragment key={field}>
          <TagButton
            tag={field}
            className={`${styles["tagBtn__checkbox"]}`}
            updateSelectedTags={(event) => this.props.updateAddTags(event, selectedField, selectedFieldName, field)}
            checked={this.props.addTags[selectedFieldName].includes(field)}
          />
        </React.Fragment>
      );
    });
    return results;
  };

  render() {
    const { addTags, updateIncreasePageNum, submitNewTechnique } = this.props;

    return (
      <React.Fragment>
        {/* Body that always changes based on state */}
        <div className={`${styles["techniqueAdd__ctn--info"]}`}>

          <div className={`${styles["techniqueAdd__tagCtn"]}`}>
            <label>Technique Categories</label>
            {/* Render buttons here */}
            <div>
              {this.renderFieldTags(
                this.state.categoryFields,
                addTags["category"],
                "category",
              )}
            </div>
            <span className={`${styles["techniqueAdd__error"]}`}></span>
          </div>

          <div className={`${styles["techniqueAdd__tagCtn"]}`}>
            <label>Target Painpoints</label>
            {/* Render buttons here */}
            <div>
              {this.renderFieldTags(
                this.state.painpointsFields,
                addTags["painpoints"],
                "painpoints"
              )}
            </div>
            <span className={`${styles["techniqueAdd__error"]}`}></span>
          </div>

          <div className={`${styles["techniqueAdd__info--btns"]}`}>
            <NavLink to="/techniques">
              <Button 
                class={`${styles["techniqueAdd__infoBtn--cancel"]}`} 
                content="Cancel" 
              />
            </NavLink>

            <Button
              class={`${styles["techniqueAdd__infoBtn"]}`}
              content="Previous"
              clickEvent={() => updateIncreasePageNum(false)}
            />

            <Button 
              class={`${styles["techniqueAdd__infoBtn"]}`} 
              content="Submit" 
              clickEvent={() => submitNewTechnique(this.checkTagsNotEmpty)} 
            />
          </div>

        </div>
      </React.Fragment>
    );
  }
}

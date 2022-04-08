import React from "react";
import axios from "axios";

import Button from "../button/Button";
import TagButton from "../button/TagButton";

import styles from "../../../styles/main.module.css";

/**
 * Layout of techniqueModal
 */
export default class TechniqueModal extends React.Component {
  BASE_API_URL = "http://localhost:3001/";

  state = {
    categoryFields: [],
    painpointsFields: [],

    difficulty: "None",
    orderBy: "None",

    isBroadMatch: false,
    selectedCategory: [],
    selectedPainPoints: [],
  };

  componentDidMount = () => {
    let categoryResp = ["Exercising", "Meditation", "Diet", "Communication",
      "Sleeping", "Mental Health", "Indoors", "Outdoors"];

    let painpointResp = ["Anger", "Sleep", "Focus", "Lifestyle", "Relationships",
      "Happiness", "Anxiety", "Mindfulness", "Stress", "Physical Health", "Mental Health"];

    this.setState({
      categoryFields: categoryResp,
      painpointsFields: painpointResp,
    });
  };

  renderTags = (tagFields, tagName, tagArray) => {
    return tagFields.map((tag, index) => {
      return (
        <React.Fragment key={`tag${index}`}>
          <TagButton
            tag={tag}
            className={`${styles["tagBtn__checkbox"]}`}
            updateSelectedTags={(event) => this.updateSelectedTags(event, tagName, tagArray)}
            checked={tagArray.includes(tag)}
          />
        </React.Fragment>
      );
    });
  }

  updateField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateIsBroadMatch = () => {
    this.setState({
      isBroadMatch: !this.state.isBroadMatch
    })
  }

  // Need to refactor this shit later
  updateSelectedTags = (event, tagName, tagArray) => {
    if (tagArray.includes(event.target.value)) {
      let indexToRemove = tagArray.findIndex(function (tag) {
        return tag === event.target.value;
      });
      this.setState({
        [tagName]: [
          ...tagArray.slice(0, indexToRemove),
          ...tagArray.slice(indexToRemove + 1),
        ]
      });
    } else {
      this.setState({
        [tagName]: [...tagArray, event.target.value],
      });
    }
  };

  resetSelected = (event) => {
    event.preventDefault();
    this.setState({
      difficulty: "None",
      orderBy: "None",
      isBroadMatch: false,
      selectedCategory: [],
      selectedPainPoints: [],
    });
  };

  applyFilters = () => {
    const { difficulty, orderBy, isBroadMatch, selectedCategory, selectedPainPoints } = this.state;
    this.props.updateStateObjects("filterOptions", {
      difficulty, orderBy, isBroadMatch,
      selectedCategory, selectedPainPoints,
    })
  }

  render() {
    const {
      difficulty, orderBy, isBroadMatch,
      categoryFields, painpointsFields,
      selectedCategory, selectedPainPoints
    } = this.state;

    return (
      <div className={`${styles["techniqueModal"]}`}>

        <span onClick={this.props.onClick}>&#10005;</span>

        <section className={`${styles["techniqueModal__ctn"]}`}>

          <header className={`${styles["techniqueModal__header"]}`}>
            <h1>Filter Options</h1>
            <div>
              <Button clickEvent={this.resetSelected} content="Reset" />
              <Button clickEvent={this.applyFilters} content="Apply" />
            </div>
          </header>

          <div className={`${styles["techniqueModal__dropdowns"]}`}>

            <div className={`${styles["techniqueModal__dropdownsCtn"]}`}>
              <label>Duration Order</label>
              <select name="orderBy" value={orderBy} onChange={this.updateField}>
                <option>None</option>
                <option>Ascending</option>
                <option>Descending</option>
              </select>
            </div>

            <div className={`${styles["techniqueModal__dropdownsCtn"]}`}>
              <label>Difficulty</label>
              <select name="difficulty" value={difficulty} onChange={this.updateField}>
                <option>None</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

          </div>



          <div className={`${styles["techniqueModal__tagsCtn"]}`}>

            <h1>Filter Tags</h1>

            <div className={`${styles["techniqueModal__matchAll"]}`}>
              <div>
                <span>Broad Matches</span>
                <span>Only match wellness techniques if all criterias are met.</span>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="isBroadMatch"
                  value={isBroadMatch}
                  onChange={this.updateIsBroadMatch}
                  checked={isBroadMatch}
                />
              </div>

            </div>

      

            <div className={`${styles["techniqueModal__tagsSection"]}`}>
              <span>Find techniques with the following categories</span>
              <div>{this.renderTags(categoryFields, "selectedCategory", selectedCategory)}</div>
            </div>



            <div className={`${styles["techniqueModal__tagsSection"]}`}>
              <span>Find techniques that solves the following painpoints</span>
              <div>{this.renderTags(painpointsFields, "selectedPainPoints", selectedPainPoints)}</div>
            </div>


          </div>





        </section>
      </div>
    );
  }
}

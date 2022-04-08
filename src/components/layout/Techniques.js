import React, { Fragment } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import TechniqueModal from "../ui/modal/TechniqueModal";
import TechniqueSearch from "./technique/TechniqueSearch";
import TechniqueCards from "./technique/TechniqueCards";
import TechniqueDisplay from "../ui/modal/TechniqueDisplay";

import Button from "../ui/button/Button";

import styles from "../../styles/main.module.scss";

let searchTimer;

export default class Techniques extends React.Component {
  BASE_API_URL = "http://localhost:3001/";

  state = {
    // Store cards
    renderedCards: [],

    // Need to change searchResponse to no longer be dynamic 
    searchResponse: [],
    isFilterOpen: false,

    // Need to covert isDisplayOpen to a link instead of a modal
    isDisplayOpen: false,


    // Current TechniqueCard
    selectedInfo: {},

    // TechniqueModal filter options
    searchField: "",
    filterOptions: {},

    // sesssionUser
    sessionUser: ""
  };

  componentDidMount = async () => {
    let response = await axios.get(this.BASE_API_URL + "techniques");

    // Need to remove these and replace it with something more static
    let categoryResp = await axios.get(
      this.BASE_API_URL + "techniques/category"
    );
    let painpointResp = await axios.get(
      this.BASE_API_URL + "techniques/painpoints"
    );

    this.setState({
      // Rename response, its like crap
      searchResponse: response.data.techniqueArrays,
      sessionUser: response.data.sessionUser,

      categoryFields: categoryResp.data,
      painpointsFields: painpointResp.data,
    });
  };

  // TechniqueSearch functions
  updateStateObjects = (stateName, stateObj) => {
    this.setState({
      [stateName]: stateObj
    })
  }

  // Techniques functions
  isFilterOpenUpdate = (event) => {
    this.setState({
      isFilterOpen: !this.state.isFilterOpen,
    });
  };

  // Renders TechniqueCards
  renderCards = () => {
    const { searchResponse } = this.state;
    return searchResponse.map((techniqueInfo, index) => {
      console.log(techniqueInfo);
      return (
        <NavLink to={`/technique/${techniqueInfo._id}`}>
          <TechniqueCards
            key={`techniqueCard${index}`}
            techniqueInfo={techniqueInfo}
            updateStateObjects={this.updateStateObjects}
          />
        </NavLink>
      );
    })
  }

  // Renders everything based on state
  renderContent = () => {
    const { searchField, filterOptions } = this.state;

    if (this.state.isFilterOpen) {
      return (
        <TechniqueModal
          onClick={this.isFilterOpenUpdate}
          resetSelected={this.resetSelected}
          updateStateObjects={this.updateStateObjects}
        />
      );
    } else {
      return (
        <Fragment>
          <div className={`${styles["technique__ctn--search"]}`}>
            <h1>Recommended Wellbeing Techniques</h1>
            <TechniqueSearch 
              updateStateObjects={this.updateStateObjects} 
              searchField={searchField}
              filterOptions={filterOptions} 
            />
          </div>

          <div className={`${styles["technique__ctn--btns"]}`}>
            <Button
              class={`${styles["technique__btn"]}`}
              content="Filter Options"
              clickEvent={this.isFilterOpenUpdate}
            />

            <NavLink to="/techniques/add-technique">
              <Button
                class={`${styles["technique__btn"]}`}
                content="Add Technique"
              />
            </NavLink>
          </div>

          <div className={`${styles["technique__ctn--content"]}`}>
            {this.renderCards()}
          </div>
        </Fragment>
      )
    }
  };

  render() {
    return (
      <main className={`${styles["technique"]}`}>
        {this.renderContent()}
      </main>
    );
  }
}

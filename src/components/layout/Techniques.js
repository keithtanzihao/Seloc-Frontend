import React from "react";
import axios from "axios";

import TechniqueModal from "../ui/modal/TechniqueModal";
import TechniqueSearch from "./technique/TechniqueSearch";
import TechniqueCards from "./technique/TechniqueCards";
import Button from "../ui/button/Button";

import styles from "../../styles/main.module.scss";

let searchTimer;

export default class Techniques extends React.Component {
  BASE_API_URL = "http://localhost:3001/";

  state = {
    searchField: "",
    searchResponse: [],
    isFilterOpen: false,

    isCategoryBroadMatch: false,
    isPainpointBroadMatch: false,

    categoryFields: [],
    selectedCategory: [],

    painpointsFields: [],
    selectedPainPoints: [],
  };

  componentDidMount = async () => {
    let response = await axios.get(this.BASE_API_URL + "techniques");
    let categoryResp = await axios.get(
      this.BASE_API_URL + "techniques/category"
    );
    let painpointResp = await axios.get(
      this.BASE_API_URL + "techniques/painpoints"
    );

    this.setState({
      categoryFields: categoryResp.data,
      painpointsFields: painpointResp.data,
    });

    this.renderTechniques(response.data);
  };

  renderTechniques = async (resData) => {
    this.setState({
      searchResponse: resData.map(function (techniqueInfo) {
        return (
          // <React.Fragment key={techniqueInfo._id}>
          //   <div className={`${styles["technique__test"]}`}>
          //     <h1>{techniqueInfo.title}</h1>
          //     <p>{techniqueInfo.category}</p>
          //     <p>{techniqueInfo.benefits}</p>
          //     <p>{techniqueInfo.instructions}</p>
          //     <p>{techniqueInfo.painpoints}</p>
          //   </div>
          // </React.Fragment>
          <TechniqueCards title={techniqueInfo.title} />
        );
      }),
    });
  };

  searchFieldUpdate = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        // Might be bad Practise BUT YOU GONNA CRY
        clearTimeout(searchTimer);
        searchTimer = setTimeout(async () => {
          if (this.state.searchField !== "") {
            let response = await axios.post(
              this.BASE_API_URL + "techniques/search",
              {
                searchQuery: this.state.searchField,
                // category: this.state.searchField,
                // painPoints: this.state.searchField,
              }
            );
            this.renderTechniques(response.data);
          } else {
            // Resets data if there is nothing in search bar
            let response = await axios.get(this.BASE_API_URL + "techniques");
            this.renderTechniques(response.data);
          }
        }, 500);
      }
    );
  };

  updateSelectedCategory = (event) => {
    if (this.state.selectedCategory.includes(event.target.value)) {
      let indexToRemove = this.state.selectedCategory.findIndex(function (
        category
      ) {
        return category === event.target.value;
      });

      this.setState({
        selectedCategory: [
          ...this.state.selectedCategory.slice(0, indexToRemove),
          ...this.state.selectedCategory.slice(indexToRemove + 1),
        ],
      });
    } else {
      this.setState({
        selectedCategory: [...this.state.selectedCategory, event.target.value],
      });
    }
  };

  updateSelectedPainPoints = (event) => {
    if (this.state.selectedPainPoints.includes(event.target.value)) {
      let indexToRemove = this.state.selectedPainPoints.findIndex(function (
        category
      ) {
        return category === event.target.value;
      });

      this.setState({
        selectedPainPoints: [
          ...this.state.selectedPainPoints.slice(0, indexToRemove),
          ...this.state.selectedPainPoints.slice(indexToRemove + 1),
        ],
      });
    } else {
      this.setState({
        selectedPainPoints: [...this.state.selectedPainPoints, event.target.value],
      });
    }
  };

  updateIsBroadMatch = (event, isBroadMatch) => {
    this.setState({
      [event.target.name]: !this.state[isBroadMatch],
    });
  };

  resetSelected = (event) => {
    event.preventDefault();
    this.setState({
      isCategoryBroadMatch: false,
      isPainpointBroadMatch: false,
      selectedCategory: [],
      selectedPainPoints: [],
    });
  };


  isFilterOpenUpdate = (event) => {
    this.setState({
      isFilterOpen: !this.state.isFilterOpen,
    });
  };

  renderModal = () => {
    return this.state.isFilterOpen ? (
      <TechniqueModal
        onClick={this.isFilterOpenUpdate}

        isCategoryBroadMatch={this.state.isCategoryBroadMatch}
        isPainpointBroadMatch={this.state.isPainpointBroadMatch}

        updateIsBroadMatch={this.updateIsBroadMatch}

        categoryFields={this.state.categoryFields}
        selectedCategory={this.state.selectedCategory}
        updateSelectedCategory={this.updateSelectedCategory}

        painpointsFields={this.state.painpointsFields}
        selectedPainPoints={this.state.selectedPainPoints}
        updateSelectedPainPoints={this.updateSelectedPainPoints}

        resetSelected={this.resetSelected}
      />
    ) : (
      ""
    );
  };

  render() {
    return (
      <main className={`${styles["technique"]}`}>
        {this.renderModal()}

        <h1>Articles</h1>
        <TechniqueSearch
          searchField={this.state.searchField}
          searchFieldUpdate={this.searchFieldUpdate}

        />

        <Button
          class={`${styles["technique__btn"]}`}
          content="Filter Options"
          clickEvent={this.isFilterOpenUpdate}
        />

        {this.state.searchResponse}
      </main>
    );
  }
}

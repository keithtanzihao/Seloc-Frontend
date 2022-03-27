import React from "react";
import axios from "axios";

import TechniqueModal from "../ui/modal/TechniqueModal";
import TechniqueSearch from "./technique/TechniqueSearch";
import Button from "../ui/button/Button";

import styles from "../../styles/main.module.scss";


let searchTimer;

export default class Techniques extends React.Component {
  BASE_API_URL = "http://localhost:3001/";

  state = {
    searchField: "",
    searchResponse: [],
    isFilterOpen: false
  };

  componentDidMount = async () => {
    let response = await axios.get(this.BASE_API_URL + "techniques");
    this.renderTechniques(response.data);
  }

  renderTechniques = async (resData) => {
    this.setState({
      searchResponse: resData.map(function (techniqueInfo) {
        return (
          <React.Fragment key={techniqueInfo._id}>
            <div className={`${styles["technique__test"]}`}>
              <h1>{techniqueInfo.title}</h1>
              <p>{techniqueInfo.category}</p>
              <p>{techniqueInfo.benefits}</p>
              <p>{techniqueInfo.instructions}</p>
              <p>{techniqueInfo.painpoints}</p>
            </div>
          </React.Fragment>
        )
      })
    })
  }

  searchFieldUpdate = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      // Might be bad Practise BUT YOU GONNA CRY
      clearTimeout(searchTimer);
      searchTimer = setTimeout(async () => {
        if (this.state.searchField !== "") {
          let response = await axios.post(this.BASE_API_URL + "techniques/search", {
            searchQuery: this.state.searchField,
            // category: this.state.searchField,
            // painPoints: this.state.searchField,
          });
          this.renderTechniques(response.data);

        } else {
          // Resets data if there is nothing in search bar
          let response = await axios.get(this.BASE_API_URL + "techniques");
          this.renderTechniques(response.data);
        }
      }, 500)
    });
  };

  isFilterOpenUpdate = (event) => {
    this.setState({
      isFilterOpen: !this.state.isFilterOpen
    })
  };

  renderContent = () => {
    if (this.state.isFilterOpen) {
      return <TechniqueModal />
    }
  }


  render() {
    return (
      <main className={`${styles["technique"]}`}>

        <TechniqueModal />
        {/* {this.renderContent()} */}

        {/* <h1>Articles</h1> */}
        {/* <TechniqueSearch
          searchField={this.state.searchField}
          searchFieldUpdate={this.searchFieldUpdate}
        /> */}

        {/* <Button
          class={`${styles["technique__btn"]}`}
          content="Filter Options"
          clickEvent={this.isFilterOpenUpdate}
        /> */}
        {/* {this.state.searchResponse} */}

      </main>
    );
  }
}

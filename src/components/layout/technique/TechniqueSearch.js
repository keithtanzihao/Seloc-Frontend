import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import styles from "../../../styles/main.module.scss";
import { BsSearch } from "react-icons/bs";

let searchTimer;
const BASE_API_URL = "http://localhost:3001/";

export default class TechniqueSearch extends React.Component {
  state = {
    filterOptions: this.props.filterOptions || {},
  };

  searchFieldSubmit = async () => {
    // Scuffed but works i guess
    let queryPayload = this.props.searchField || " ";
    let filterPayload = JSON.stringify({
      ...this.props.filterOptions,
    });

    console.log(`|_${queryPayload}_|`);
    console.log("-----------------------------------------------");
    console.log(filterPayload)
    console.log("-----------------------------------------------");

    let response = await axios.get(
      BASE_API_URL + `techniques/search/${queryPayload}/${filterPayload}`
    );
    console.log(response);
    this.props.updateStateObjects("searchResponse", response.data);
  };

  render() {
    const { searchField } = this.props;
    return (
      <div className={`${styles["technique__searchCtn"]}`}>
        <div>
          <input
            className={`${styles["technique__searchBar"]}`}
            type="text"
            name="searchField"
            value={searchField}
            onChange={(event) =>
              this.props.updateStateObjects("searchField", event.target.value)
            }
            placeholder="Search"
          />
          <button
            className={`${styles["technique__searchBtn"]}`}
            onClick={this.searchFieldSubmit}
          >
            <BsSearch/>
          </button>
        </div>
      </div>
    );
  }
}
